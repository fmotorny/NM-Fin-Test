import { TestBed } from '@angular/core/testing';

import { TodoLogicService } from './todo.logic.service';

describe('TodoLogicService', () => {
  let service: TodoLogicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodoLogicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
