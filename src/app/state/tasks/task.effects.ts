import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loadTasks, loadTasksSuccess } from './task.actions';
import { map, of } from 'rxjs';

@Injectable(
  { providedIn: 'root' }
)
export class TaskEffects {

  loadTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTasks),
      map(() =>
        loadTasksSuccess({
          tasks: [
            { id: '1', title: 'Learn Angular', completed: false },
            { id: '2', title: 'Build Project', completed: false }
          ]
        })
      )
    )
  );

  constructor(private actions$: Actions) {}
}
