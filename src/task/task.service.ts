import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from 'src/schemas/task-schema';
import { CreateTaskDto, UpdateTaskDto } from './task.dto';
import { Project, ProjectDocument } from 'src/schemas/project-schema';
@Injectable()
export class TaskService {
    constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>,
    @InjectModel(Project.name) private projectModel: Model<ProjectDocument>){}

    
    async create(createTaskDto: CreateTaskDto): Promise<Task> {
        const createdTask = await this.taskModel.create(createTaskDto);
      
        await this.projectModel.findByIdAndUpdate(
          createTaskDto.project,
          { $push: { tasks: createdTask._id } },
          { new: true }
        );
      
        return createdTask;
      }
      
    async findAll(id: string): Promise<Task[]> {
        const tasks = await this.taskModel.find({ project: id }).populate('project').exec();
        return tasks;
    }

    async findOne(id: string): Promise<Task> {
        return this.taskModel.findById(id).populate('project').exec();
    }

    async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
        return this.taskModel.findByIdAndUpdate(id, updateTaskDto, { new: true }).exec();
    }

    async delete(id: string): Promise<Task> {
        return this.taskModel.findByIdAndDelete(id).exec();
    }
}
