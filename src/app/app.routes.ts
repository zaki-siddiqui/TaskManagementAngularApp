import { Routes } from '@angular/router';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { TaskListComponent } from './components/task-list/task-list.component';

export const routes: Routes = [
  {path: '', redirectTo: 'tasks', pathMatch: 'full'},
  {path: 'tasks', component: TaskListComponent},
  {path: 'create', component: TaskFormComponent},
  {path: 'edit/:id', component: TaskFormComponent}
];
