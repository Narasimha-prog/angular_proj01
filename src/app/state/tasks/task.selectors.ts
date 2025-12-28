import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TaskState } from './task.reducer';

export const selectTaskState = createFeatureSelector<TaskState>('tasks');

export const selectAllTasks =
// Selector to get all tasks from the state
//first argument is used to call second argument and it is called then  it return only tasks array
 createSelector(
  selectTaskState,
  (state) => state.tasks
);
