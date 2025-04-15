import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskSchema } from 'src/schemas/task-schema';
import { Project, ProjectSchema } from 'src/schemas/project-schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }, { name: Project.name, schema: ProjectSchema }]),
  ],
  providers: [TaskService],
  controllers: [TaskController]
})
export class TaskModule {}
