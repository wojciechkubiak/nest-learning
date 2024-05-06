import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import Task, { TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const task: Task = {
      ...createTaskDto,
      id: uuid(),
      status: TaskStatus.IN_PROGRESS,
    };

    this.tasks.push(task);

    return task;
  }
}
