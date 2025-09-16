import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Task } from '../shared/models/task.model';
import { TaskStorageService } from '../task-storage.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css']
})
export class TaskEditComponent implements OnInit {
  task: Task | undefined;
  id: number | undefined;

  title = new FormControl('');
  note = new FormControl('');

  constructor(
    private storage: TaskStorageService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      this.task = this.storage.get(idParam);
      if (this.task) {
        this.id = this.task.id;
        this.title.setValue(this.task.title);
        this.note.setValue(this.task.note);
      } else {
        alert('Task not found');
        this.router.navigate(['/tasks']);
      }
    });
  }

  updateTask() {
    if (!this.id) return;
    if (!this.title.value || this.title.value.trim() === '') {
      alert('Title cannot be empty');
      return;
    }
    this.storage.update(this.id, this.title.value.trim(), this.note.value || '');
    this.router.navigate(['/tasks']);
  }
}
