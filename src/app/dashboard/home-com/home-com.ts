import { Component, PLATFORM_ID } from '@angular/core';
import { TaskCardCom } from '../task-card-com/task-card-com';
import { Observable, take } from 'rxjs';
import { Task } from '../../state/tasks/task.models';
import { Store } from '@ngrx/store';
import { addTask, loadTasksSuccess, toggleTask } from '../../state/tasks/task.actions';
import { selectAllTasks } from '../../state/tasks/task.selectors';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-home-com',
  imports: [TaskCardCom,CommonModule],
  templateUrl: './home-com.html',
  styleUrl: './home-com.scss',
})
export class HomeCom {

  
tasks$: Observable<Task[]>; // Observable of tasks



  constructor(private store: Store) {
    // select tasks from store
    this.tasks$ = this.store.select(selectAllTasks)

    // Load initial tasks (simulate API)
    this.tasks$.pipe(take(1)).subscribe(tasks => {
  if (!tasks || tasks.length === 0) {
    const initialTasks: Task[] = [
      { id: '1', title: 'Learn Angular', completed: false },
      { id: '2', title: 'Practice NgRx', completed: true }
    ];
    this.store.dispatch(loadTasksSuccess({ tasks: initialTasks }));
  }
});

  }

  addTask() : void {
    const newTask: Task = {
      id: Date.now().toString(),
      title: 'New Task',
      completed: false
    };
    if(isPlatformBrowser(PLATFORM_ID)) {
      console.log('Dispatching addTask for:', newTask);
    }
    this.store.dispatch(addTask({ task: newTask }));
  }

  toggle(id: string) {

    if(isPlatformBrowser(PLATFORM_ID)) {
      console.log('Toggling task with id:', id);
    } 
    this.store.dispatch(toggleTask({ id }));
  }

}
