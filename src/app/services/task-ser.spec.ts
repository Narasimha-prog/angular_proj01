import { TestBed } from '@angular/core/testing';

import { TaskSer } from './task-ser';

describe('TaskSer', () => {
  let service: TaskSer;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskSer);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
