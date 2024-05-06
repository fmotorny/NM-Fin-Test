import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './components/list/list.component';
import { AddTodoComponent } from './components/add-todo/add-todo.component';

const routes: Routes = [
  { path: '', redirectTo: '/add', pathMatch: 'full' },
  {
    path: 'add',
    component: AddTodoComponent,
  },
  {
    path: 'list',
    component: ListComponent,
    data: { isFavorite: false },
  },
  {
    path: 'favorite',
    component: ListComponent,
    data: { isFavorite: true },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
