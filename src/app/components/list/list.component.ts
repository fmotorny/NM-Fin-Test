import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TodoLogicService } from '../../todo-service/todo.logic.service';
import { AsyncPipe, NgIf } from '@angular/common';
import { TodosComponent } from '../todos/todos.component';
import { map, Observable, of } from 'rxjs';
import { TodoModel } from '../../core/models/todo.model';
import * as moment from 'moment';
import { ActivatedRoute } from '@angular/router';
import { TodosTypeEnum } from '../../core/enums/todos-type.enum';
import { StorageMap } from '@ngx-pwa/local-storage';

const isFavorites = (todos: TodoModel[]) =>
  todos.filter((todo) => todo.isFavorite);
const isToday = (todos: TodoModel[]) =>
  todos.filter((todo) => moment().isSame(todo.expirationDate, 'day'));
const isOther = (todos: TodoModel[]) =>
  todos.filter((todo) => !moment().isSame(todo.expirationDate, 'day'));

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [AsyncPipe, TodosComponent, NgIf],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent {
  private list$ = this.todoLogic.getAllTodoList();
  todayTodos$ = this.list$.pipe(map(isToday));
  otherTodos$ = this.list$.pipe(map(isOther));
  favoriteTodos$ = this.list$.pipe(map(isFavorites));
  snapData$: Observable<{ isFavorite: boolean }> = of(
    this.route.snapshot.data as { isFavorite: boolean }
  );
  todosType = TodosTypeEnum;

  constructor(
    private todoLogic: TodoLogicService,
    private route: ActivatedRoute
  ) {}
}
