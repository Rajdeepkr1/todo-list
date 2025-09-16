import { Component, OnInit } from '@angular/core';
import { TaskStorageService } from '../task-storage.service';
import { Task } from '../shared/models/task.model';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private storage: TaskStorageService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks() {
    this.tasks = this.storage.getAll();
  }

  delete(id: number): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.storage.delete(id);
      this.loadTasks();
    }
  }
}
