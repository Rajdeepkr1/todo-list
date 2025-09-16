import { Component, OnInit } from '@angular/core';
import { Task } from '../shared/models/task.model';
import { TaskStorageService } from '../task-storage.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.css']
})
export class TaskViewComponent implements OnInit {
  task: Task | undefined;

  constructor(
    private storage: TaskStorageService,
    private route: ActivatedRoute,
    private router: Router) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.task = this.storage.get(id);
      if (!this.task) {
        alert('Task not found');
        this.router.navigate(['/tasks']);
      }
    });
  }

  delete(id: number): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.storage.delete(id);
      this.router.navigate(['/tasks']);
    }
  }
}
