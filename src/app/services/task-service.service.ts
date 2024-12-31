import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskServiceService {
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  tasks$ = this.tasksSubject.asObservable();

  private tasks: Task[] = [];

  addTask(task:Task):void {
    this.tasks.push({...task,id: Date.now(), completed: false });
    this.tasksSubject.next(this.tasks);
  }

  updateTask(updateTask: Task):void {
    this.tasks = this.tasks.map(task => task.id === updateTask.id ? updateTask : task);
    this.tasksSubject.next(this.tasks);
  }

  deleteTask(id: number):void {
    this.tasks = this.tasks.filter(task => task.id !== id);
    this.tasksSubject.next(this.tasks);
  }
  
}
