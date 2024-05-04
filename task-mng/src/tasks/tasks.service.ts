import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import Task, { TaskStatus } from './task.model';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  createTask({ title, description }: Partial<Task>): Task {
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.IN_PROGRESS,
    };

    this.tasks.push(task);

    return task;
  }
}
