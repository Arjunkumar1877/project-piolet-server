import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Project, ProjectDocument } from 'src/schemas/project-schema';
import { CreateProjectDto } from './project.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<ProjectDocument>
  ) {}

  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    const createdProject = new this.projectModel(createProjectDto);
    return createdProject.save();
  }

  async findAll(id: string): Promise<Project[]> {
    return this.projectModel.find({ userId: id }).exec();
  }

  async getProjectDetails(id: string): Promise<Project> {
    if (!Types.ObjectId.isValid(id)) {
      throw new Error('Invalid project ID format');
    }
    const objectId = new Types.ObjectId(id);
    const project = await this.projectModel.findById(objectId).populate('teamMembers').exec();
    return project;
  }
}