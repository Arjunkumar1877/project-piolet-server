import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto, UpdateTaskDto } from './task.dto';
import { Task } from 'src/schemas/task-schema';

@Controller('task')
export class TaskController {
    constructor(private readonly taskService: TaskService){}

    @Post()
    create(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
        return this.taskService.create(createTaskDto);
    }

    @Get()
    findAll(@Query('projectId') projectId: string): Promise<Task[]> {
        return this.taskService.findAll(projectId);
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<Task> {
        return this.taskService.findOne(id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto): Promise<Task> {
        return this.taskService.update(id, updateTaskDto);
    }

    @Delete(':id')
    delete(@Param('id') id: string): Promise<Task> {
        return this.taskService.delete(id);
    }
}
