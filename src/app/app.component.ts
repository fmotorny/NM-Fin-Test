import { Component } from '@angular/core';
import { AsyncPipe, JsonPipe, NgForOf } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [NgForOf, AsyncPipe, JsonPipe],
  standalone: true,
})
export class AppComponent {
  title = 'client';

  constructor() {}
}
