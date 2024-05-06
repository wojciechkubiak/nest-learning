import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import Task, { TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: string): Task {
    return this.tasks.find((task) => task.id === id);
  }

  getTasksByFilters(filterDto: GetTasksFilterDto): Task[] {
    const { status, search } = filterDto;

    let tasks = this.getAllTasks();

    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }

    if (search) {
      tasks = tasks.filter((task) => {
        return task.title.includes(search) || task.description.includes(search);
      });
    }

    return tasks;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;

    const task: Task = {
      title,
      description,
      id: uuid(),
      status: TaskStatus.IN_PROGRESS,
    };

    this.tasks.push(task);

    return task;
  }

  updateTaskStatusById(id: string, status: TaskStatus): Task {
    const taskId = this.tasks.findIndex((task) => task.id === id);

    if (taskId > -1) {
      this.tasks[taskId].status = status;

      return this.tasks[taskId];
    }

    return null;
  }

  deleteTaskById(id: string): void {
    const taskId = this.tasks.findIndex((task) => task.id === id);

    console.log(this.tasks);

    if (taskId > -1) this.tasks.splice(taskId, 1);

    console.log(this.tasks);
  }
}
