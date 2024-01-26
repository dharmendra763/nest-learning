import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { TaskStatus } from '../../tasks.model';

@Injectable({})
export class TaskStatusValidationPipe implements PipeTransform {
  readonly allowedStatues = [
    TaskStatus.OPEN,
    TaskStatus.DONE,
    TaskStatus.IN_PROGRESS,
  ];
  transform(value: any) {
    value = value.toUpperCase();
    if (this.isStatusValid(value)) {
      throw new BadRequestException(`"${value}" is an invalid status`);
    }
    return value;
  }

  private isStatusValid(status: any) {
    return this.allowedStatues.includes(status);
  }
}
