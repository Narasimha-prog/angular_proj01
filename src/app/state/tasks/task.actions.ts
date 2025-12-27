import { createAction, props } from '@ngrx/store';
import { Task } from './task.models';

export const loadTasks = createAction('[Task] Load Tasks');

export const loadTasksSuccess = createAction(
  '[Task] Load Tasks Success',
  props<{ tasks: Task[] }>()
);

export const addTask = createAction(
  '[Task] Add Task',
  props<{ task: Task }>()
);

export const toggleTask = createAction(
  '[Task] Toggle Task',
  props<{ id: string }>()
);
