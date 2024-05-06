import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Location, NgIf } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButton } from '@angular/material/button';
import { TodoLogicService } from '../../todo-service/todo.logic.service';
import { TodoModel } from '../../core/models/todo.model';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import {
  checkDateSync,
  checkTimeSync,
  checkTitleMaxLengthSync,
} from '../../core/validators/todo.validators';
import * as moment from 'moment';
import { first } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-todo',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButton,
    NgxMaterialTimepickerModule,
    MatDatepickerModule,
    NgIf,
  ],
  templateUrl: './add-todo.component.html',
  styleUrl: './add-todo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddTodoComponent {
  todoForm = this.fb.group(
    {
      title: ['', [Validators.required, checkTitleMaxLengthSync]],
      expirationDate: ['', [Validators.required, checkDateSync]],
      expirationTime: ['', [checkTimeSync]],
    }
  );
  constructor(
    private fb: FormBuilder,
    private location: Location,
    private todoLogic: TodoLogicService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  back() {
    this.location.back();
  }

  addToList() {
    this.todoForm.disable();
    Object.values(this.todoForm.controls).forEach((control) => {
      control.markAsDirty();
      control.markAsTouched();
    });

    if (this.todoForm.invalid) {
      console.error('form is invalid');
      return;
    }

    const expirationDate = moment(
      this.todoForm.controls.expirationDate.value,
    ).format('MMM DD, YYYY');
    this.todoForm.value.expirationDate = expirationDate;
    const obj = {
      ...this.todoForm.value,
      createdAt: moment().format('MMM DD, YYYY'),
    } as TodoModel;
    this.todoLogic.addToTodoList(obj);

    this.todoLogic.getStoreStatus().pipe(
      first()
    ).subscribe((res) => {
      this.todoForm.enable();
      this.cdr.detectChanges();
      this.router.navigate(['list']);
    })
  }

  timeSet() {}
}
