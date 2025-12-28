import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../state/tasks/task.models';

@Component({
  selector: 'app-task-card-com',
  imports: [],
  templateUrl: './task-card-com.html',
  styleUrl: './task-card-com.scss',
})
export class TaskCardCom {

  @Input() task!: Task;          // Receive the task object
  @Output() toggle = new EventEmitter<string>();// Emit task id when toggled

  onToggle() {
    this.toggle.emit(this.task.id);
  }
}
