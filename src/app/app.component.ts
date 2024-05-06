import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FlexLayoutModule } from 'ngx-flexible-layout';
import { TodoLogicService } from './todo-service/todo.logic.service';
import { first } from 'rxjs';
import { TodoModel } from './core/models/todo.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    RouterOutlet,
    RouterLink,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
    RouterLinkActive,
  ],
  standalone: true,
})
export class AppComponent implements OnInit {
  constructor(private todoLogic: TodoLogicService) {}
  ngOnInit() {
    this.todoLogic
      .getTodoFromStorage('todo-list')
      .pipe(first())
      .subscribe((res) => {
        const list = res as TodoModel[];
        this.todoLogic.initializeTodoList(list);
      });
  }
}
