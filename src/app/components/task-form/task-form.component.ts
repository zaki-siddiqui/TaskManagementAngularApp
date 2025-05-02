import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Category } from '../../models/category.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from '../../models/task.model';
import { compileDeclareNgModuleFromMetadata } from '@angular/compiler';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './task-form.component.html'
})
export class TaskFormComponent {
  taskForm: FormGroup;
  categories = signal<Category[]>([]);
  errorMessage = signal<string | null>(null);
  successMessage = signal<string | null>(null);
  isLoading = signal(false);
  isEditMode = signal(false);
  taskId = signal<number | null>(null);

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private route: ActivatedRoute,
    public router: Router
  ) {
    this.taskForm = this.fb.group({
      taskId: [0],
      title: ['', [Validators.required, Validators.maxLength(100)]],
      description: [''],
      dueDate: [''],
      isCompleted: [false],
      categoryId: [null, Validators.required]
    });

    this.route.paramMap.subscribe(param => {
    const id = param.get('id');
    if(id){
      this.isEditMode.set(true);
      this.taskId.set(+id);
      this.loadTask(+id);
    }
    });

    this.loadCategories();
  }

  loadTask(id: number): void {
    debugger
    this.isLoading.set(true);
    this.taskService.getTask(id).subscribe({
      next: (task) => {
        this.taskForm.patchValue({
          taskId: id,
          title: task.title,
          description: task.description,
          //dueDate: task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '',
          dueDate: task.dueDate ?  (task.dueDate).split('T')[0] : '',
          isCompleted: task.isCompleted,
          categoryId: task.categoryId
        });
        this.isLoading.set(false);
      },
      error: (err) => {
        this.errorMessage.set('Failed to load task');
        this.isLoading.set(false);
      }
    });
  }

  loadCategories(): void {
    this.isLoading.set(true);
    this.taskService.getCategories().subscribe({
      next: (data) => {
        this.categories.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.errorMessage.set('Failed to load categories');
        this.isLoading.set(false);
      }
    });
  }

  onSubmit(): void {
    debugger
    if (this.taskForm.valid) {
      this.isLoading.set(true);
      this.errorMessage.set(null);
      this.successMessage.set(null);

      const taskData = this.taskForm.value;
      const request = this.isEditMode()
      ? this.taskService.updateTask(this.taskId()!, taskData)
      : this.taskService.createTask(taskData);

      request.subscribe({
        next: () => {
          this.successMessage.set(this.isEditMode() ? 'Task updated successfully!' : 'Task created successfully!');
          this.taskForm.reset({ id: 0, isCompleted: false });
          this.isLoading.set(false);
          this.router.navigate(['/tasks']);
        },
        error: (err) => {
          this.errorMessage.set(err.error?.message || (this.isEditMode() ? 'Failed to update task' : 'Failed to create task'));
          this.isLoading.set(false);
        }
      });
    }
  }
}