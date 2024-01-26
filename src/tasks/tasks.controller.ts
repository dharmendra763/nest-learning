import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './tasks.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from "./pipe/task-status-validation/task-status-validation.pipe";

@Controller('tasks')
export class TasksController {
  constructor(private _tasksService: TasksService) {}
  @Get()
  getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto): Task[] {
    if (Object.keys(filterDto).length === 0) {
      return this._tasksService.getTasksWithFilter(filterDto);
    } else {
      return this._tasksService.getAllTasks();
    }
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string) {
    this._tasksService.getTaskById(id);
  }

  @Delete('/:id')
  deleteTaskById(@Param('id') id: string) {
    this._tasksService.deleteTaskById(id);
  }

  @Patch('/:id/status')
  updateStatus(@Param('id') id: string, @Body('status', TaskStatusValidationPipe) status: TaskStatus) {
    return this._tasksService.updateStatus(id, status);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDto: CreateTaskDto) {
    return this._tasksService.createTask(createTaskDto);
  }
}
