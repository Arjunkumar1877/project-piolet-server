import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project, ProjectDocument } from 'src/schemas/project-schema';
import { CreateTeamMemberDto } from './project.dto';
import { TeamMember, TeamMemberDocument } from 'src/schemas/team-member.schema';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<ProjectDocument>,
    @InjectModel(TeamMember.name) private teamMemberModel: Model<TeamMemberDocument>
  ) {}

  async create(createProjectDto: any): Promise<Project> {
    const createdProject = new this.projectModel(createProjectDto);
    return createdProject.save();
  }

  async createTeamMembers(createTeamMembersDto: CreateTeamMemberDto): Promise<TeamMember> {
    const createdTeamMembers = await this.teamMemberModel.create(createTeamMembersDto);
    return createdTeamMembers;
  }

  async findAll(): Promise<Project[]> {
    return this.projectModel.find().exec();
  }
}