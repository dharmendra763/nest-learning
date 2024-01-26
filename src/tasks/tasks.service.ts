import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { v1 } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks() {
    return this.tasks;
  }

  getTasksWithFilter(filterDto: GetTasksFilterDto) {
    const { status, searchTerm } = filterDto;
    let _tasks = this.getAllTasks();

    if (status) {
      _tasks = _tasks.filter((task) => task.status === status);
    }
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      _tasks = _tasks.filter(
        (task) =>
          task.title.toLowerCase().includes(search) ||
          task.description.includes(search),
      );
    }

    return _tasks;
  }

  getTaskById(id: string): Task {
    const found = this.tasks.find((task) => task.id === id);

    if (!found) {
      throw new NotFoundException(`task with ID "${id}" not found`);
    }
    return found;
  }

  deleteTaskById(id: string): void {
    const found = this.getTaskById(id);
    if (found) {
      this.tasks = this.tasks.filter((task) => task.id === found.id);
    }
  }

  updateStatus(id: string, status: TaskStatus) {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }

  createTask(createTaskDto: CreateTaskDto) {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: v1(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }
}
