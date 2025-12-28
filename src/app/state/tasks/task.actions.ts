import { createAction, props } from '@ngrx/store';
import { Task } from './task.models';

export const loadTasks = createAction('[Task] Load Tasks');

//action object without payload
// dispatch(loadTasks());
// { type: '[Task] Load Tasks' }


export const loadTasksSuccess = createAction(
  '[Task] Load Tasks Success',
  props<{ tasks: Task[] }>()
);

export const addTask = createAction(
  '[Task] Add Task',
  props<{ task: Task }>()
);

//action object with payload
// dispatch(addTask({ task: { id: '1', title: 'Learn NgRx', completed: false }}));
// { type: '[Task] Add Task', task: { id: '1', title: 'Learn NgRx', completed: false } }


export const toggleTask = createAction(
  '[Task] Toggle Task',
  props<{ id: string }>()
);
