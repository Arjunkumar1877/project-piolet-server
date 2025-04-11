import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project, ProjectDocument } from 'src/schemas/project-schema';
import { CreateProjectDto, CreateTeamMemberDto } from './project.dto';
import { TeamMember, TeamMemberDocument } from 'src/schemas/team-member.schema';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<ProjectDocument>,
    @InjectModel(TeamMember.name) private teamMemberModel: Model<TeamMemberDocument>
  ) {}

  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    const createdProject = new this.projectModel(createProjectDto);
    await createdProject.save();

    await Promise.all(createProjectDto.teamMembers.map(async (teamMemberId) => {
      await this.teamMemberModel.findByIdAndUpdate(
        teamMemberId,
        { $push: { projects: createdProject._id } },
        { new: true }
      );
    }));

    return createdProject;
  }

  async createTeamMembers(createTeamMembersDto: CreateTeamMemberDto): Promise<TeamMember> {
    const createdTeamMembers = await this.teamMemberModel.create(createTeamMembersDto);
    return createdTeamMembers;
  }

  async findAll(id: string): Promise<Project[]> {
    return this.projectModel.find({ userId: id }).exec();
  }

  async getTeamMembers(id: string): Promise<TeamMember[]> {
    return this.teamMemberModel.find({ userId: id }).exec();
  }
}