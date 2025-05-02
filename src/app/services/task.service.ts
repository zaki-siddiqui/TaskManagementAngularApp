import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';
import { Category } from '../models/category.model';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private apiUrl = 'https://localhost:7264/api';

  constructor(private http: HttpClient) {}

  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(`${this.apiUrl}/Tasks`, task);
  }

  updateTask(id: number, task: Task): Observable<Task>{
    return this.http.put<Task>(`${this.apiUrl}/Tasks/${id}`, task);
  }

  deleteTask(id: number): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/Tasks/${id}`);
  }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/Tasks`);
  }

  getTask(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}/Tasks/${id}`);
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/Categories`);
  }

  toggleTaskCompletion(id: number): Observable<Task> {
    return this.http.patch<Task>(`${this.apiUrl}/Tasks/${id}/toggle`, {});
  }

  bulkDeleteTasks(ids: number[]): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/Tasks/bulk`, { body: ids });
  }

  getTasksByStatus(status: string): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/Tasks/ByStatus/${status}`);
  }
  
}