import { Component } from '@angular/core';
import { TaskCardCom } from '../task-card-com/task-card-com';
import { Observable } from 'rxjs';
import { Task } from '../../state/tasks/task.models';
import { Store } from '@ngrx/store';
import { addTask, loadTasksSuccess, toggleTask } from '../../state/tasks/task.actions';
import { selectAllTasks } from '../../state/tasks/task.selectors';
import { CommonModule } from '@angular/common';

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
    const initialTasks: Task[] = [
      { id: '1', title: 'Learn Angular', completed: false },
      { id: '2', title: 'Practice NgRx', completed: true }
    ];
    this.store.dispatch(loadTasksSuccess({ tasks: initialTasks }));
  }

  addTask() {
    const newTask: Task = {
      id: Date.now().toString(),
      title: 'New Task',
      completed: false
    };
    this.store.dispatch(addTask({ task: newTask }));
  }

  toggle(id: string) {
  
    this.store.dispatch(toggleTask({ id }));
  }

}
