import { createReducer, on } from '@ngrx/store';
import { loadTasksSuccess , addTask, toggleTask } from './task.actions';
import { Task } from './task.models';

export interface TaskState {
  tasks: Task[];
}

export const initialState: TaskState = {
  tasks: []
};

export const taskReducer = createReducer(
  initialState,

  on(loadTasksSuccess, (state, { tasks }) => ({
    ...state,
    tasks
  })),

  on(addTask, (state, { task }) => ({
    ...state,
    tasks: [...state.tasks, task]
  })),

  on(toggleTask, (state, { id }) => ({
    ...state,
    tasks: state.tasks.map(t =>
      t.id === id ? { ...t, completed: !t.completed } : t
    )
  }))
);
