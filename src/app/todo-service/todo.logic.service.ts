import { Injectable } from '@angular/core';
import { BehaviorSubject, debounceTime, first, Observable } from 'rxjs';
import { TodoModel } from '../core/models/todo.model';
import { StorageMap } from '@ngx-pwa/local-storage';

@Injectable({
  providedIn: 'root',
})
export class TodoLogicService {
  private todoList$ = new BehaviorSubject<TodoModel[]>([]);
  private todoList: TodoModel[] = [];
  private storeStatus$ = new BehaviorSubject('');
  constructor(private storage: StorageMap) {}

  getAllTodoList() {
    return this.todoList$;
  }
  addToTodoList(item: TodoModel) {
    this.todoList.push(item);
    this.storage
      .set('todo-list', this.todoList)
      .pipe(first())
      .subscribe(() => {
        this.storeStatus$.next('complete');
      });
  }

  removeItemFromTodoList(item: TodoModel) {
    this.todoList = this.todoList.filter((i) => i.title !== item.title);
    this.todoList$.next(this.todoList);
    this.storage
      .set('todo-list', this.todoList)
      .pipe(first())
      .subscribe(() => {
        this.storeStatus$.next('complete');
      });
  }

  toggleFavoriteItem(item: TodoModel, isFavorite: boolean) {
    this.todoList = this.todoList.map((i) => {
      if (i.title === item.title) {
        return { ...i, isFavorite };
      }
      return i;
    });
    this.todoList$.next(this.todoList);
    this.storage
      .set('todo-list', this.todoList)
      .pipe(first())
      .subscribe(() => {
        this.storeStatus$.next('complete');
      });
  }
  getTodoFromStorage(key: string): Observable<unknown> {
    return this.storage.get(key);
  }

  initializeTodoList(list: TodoModel[]) {
    if (list?.length) {
      this.todoList = [...this.todoList, ...list];
    }
    this.todoList$.next(this.todoList);
  }

  getStoreStatus() {
    return this.storeStatus$.pipe(
      debounceTime(400)
    );
  }
}
