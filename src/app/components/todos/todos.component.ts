import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
} from '@angular/core';
import { AsyncPipe, JsonPipe, NgIf, NgStyle } from '@angular/common';
import { TodoModel } from '../../core/models/todo.model';
import { MatIcon } from '@angular/material/icon';
import { TodosTypeEnum } from '../../core/enums/todos-type.enum';
import { CountdownComponent } from './countdown/countdown.component';
import { TodoLogicService } from '../../todo-service/todo.logic.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [AsyncPipe, NgIf, MatIcon, NgStyle, CountdownComponent, JsonPipe],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodosComponent {
  @Input() head!: string;
  @Input() todos!: TodoModel[] | null;
  @Input() type!: TodosTypeEnum;
  todosType = TodosTypeEnum;
  isDisabled!: boolean;

  constructor(
    private todoLogic: TodoLogicService,
    private cdr: ChangeDetectorRef,
  ) {}
  removeItem(item: TodoModel) {
    if (this.isDisabled) {
      return;
    }
    this.todoLogic.removeItemFromTodoList(item);
    this.isDisabled = true;
    this.subscribeToStoreStatus();
  }
  toggleFavoriteItem(item: TodoModel) {
    if (this.isDisabled) {
      return;
    }
    const isFavorite = !item.isFavorite;
    this.todoLogic.toggleFavoriteItem(item, isFavorite);
    this.isDisabled = true;
    this.subscribeToStoreStatus();
  }

  private subscribeToStoreStatus() {
    this.todoLogic
      .getStoreStatus()
      .pipe(first())
      .subscribe(() => {
        this.isDisabled = false;
        this.cdr.detectChanges();
      });
  }
}
