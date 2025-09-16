import { Injectable } from '@angular/core';
import { Task } from './shared/models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskStorageService {
  private storageKey = 'data';

  getAll(): Task[] {
    const tasks = localStorage.getItem(this.storageKey);
    return tasks ? JSON.parse(tasks) : [];
  }

  get(id: string | null): Task | undefined {
    if (!id) return undefined;
    const allTasks = this.getAll();
    return allTasks.find(task => task.id === +id);
  }

  add(title: string, note: string): Task {
    const allTasks = this.getAll();
    const newTask: Task = {
      id: allTasks.length > 0 ? allTasks[allTasks.length - 1].id + 1 : 1,
      title,
      note
    };
    allTasks.push(newTask);
    localStorage.setItem(this.storageKey, JSON.stringify(allTasks));
    return newTask;
  }

  update(id: number, title: string, note: string): Task | undefined {
    let allTasks = this.getAll();
    const index = allTasks.findIndex(task => task.id === id);
    if (index > -1) {
      allTasks[index].title = title;
      allTasks[index].note = note;
      localStorage.setItem(this.storageKey, JSON.stringify(allTasks));
      return allTasks[index];
    }
    return undefined;
  }

  delete(id: number): void {
    let allTasks = this.getAll();
    allTasks = allTasks.filter(task => task.id !== id);
    localStorage.setItem(this.storageKey, JSON.stringify(allTasks));
  }
}
