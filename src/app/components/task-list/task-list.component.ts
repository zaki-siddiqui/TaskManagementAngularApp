import { Component, signal } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  templateUrl: './task-list.component.html'
})
export class TaskListComponent {
  tasks = signal<Task[]>([]);
  isLoading = signal(false);
  errorMessage = signal<string | null>(null);
  selectedTaskIds = signal<number[]>([]);
  statusFilter = signal<'all' | 'completed' | 'pending'>('all');

  constructor(private taskService: TaskService) {
    this.loadTasks();
  }

  loadTasks(): void {
    this.isLoading.set(true);
    this.taskService.getTasks().subscribe({
      next: (data) => {
        this.tasks.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.errorMessage.set('Failed to load tasksss');
        this.isLoading.set(false);
      }
    });
  }

  deleteTask(id: number): void{
    debugger
    if(confirm('Are you sure you want to delete this Task?')){
      this.isLoading.set(true);
      this.taskService.deleteTask(id).subscribe({
        next: () => {
          this.tasks.update(tasks => tasks.filter(t => t.taskId !== id));
          this.selectedTaskIds.update(ids => ids.filter(i => i !== id));
          this.isLoading.set(false);
        },
        error: (err) => {
          this.errorMessage.set('Failed to delete task');
          this.isLoading.set(false);
        }
      });
    }
  }

  toggleTask(id: number): void {
    this.isLoading.set(true);
    this.taskService.toggleTaskCompletion(id).subscribe({
      next: (updatedTask) => {
        this.tasks.update(tasks => tasks.map(t => t.taskId === id ? updatedTask : t));
        this.isLoading.set(false);
      },
      error: (err) => {
        this.errorMessage.set('Failed to toggle task');
        this.isLoading.set(false);
      }
    });
  }

toggleSelection(id: number): void {
  this.selectedTaskIds.update(ids => 
    ids.includes(id) ? ids.filter(i => i !== id) : [...ids, id]
  );
}

toggleAllSelection(event: Event): void {
  const checked = (event.target as HTMLInputElement).checked;
  this.selectedTaskIds.set(
    checked ? this.tasks().map(t => t.taskId) : []
  );
}

bulkDelete(): void {
  if (this.selectedTaskIds().length === 0) {
    this.errorMessage.set('No tasks selected');
    return;
  }
  if (confirm(`Delete ${this.selectedTaskIds().length} task(s)?`)) {
    this.isLoading.set(true);
    this.taskService.bulkDeleteTasks(this.selectedTaskIds()).subscribe({
      next: () => {
        this.tasks.update(tasks => tasks.filter(t => !this.selectedTaskIds().includes(t.taskId)));
        this.selectedTaskIds.set([]);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.errorMessage.set('Failed to delete tasks');
        this.isLoading.set(false);
      }
    });
  }
}

filterByStatus(event: Event): void {
  const selectElement = event.target as HTMLSelectElement;
  const status = selectElement.value as 'all' | 'completed' | 'pending';
  this.statusFilter.set(status);
  this.isLoading.set(true);
  this.taskService.getTasksByStatus(status).subscribe({
    next: (data) => {
      this.tasks.set(data);
      this.isLoading.set(false);
    },
    error: (err) => {
      this.errorMessage.set('Failed to load tasks');
      this.isLoading.set(false);
    }
  });
}


}