import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskCardCom } from './task-card-com';

describe('TaskCardCom', () => {
  let component: TaskCardCom;
  let fixture: ComponentFixture<TaskCardCom>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskCardCom]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskCardCom);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
