import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { TeamMember, TeamMemberDocument } from 'src/schemas/team-member.schema';
import { CreateTeamMemberDto } from '../project/project.dto';
import { Project, ProjectDocument } from 'src/schemas/project-schema';
import { AddToProjectDto } from './team-members.dto';

@Injectable()
export class TeamMembersService {
  constructor(
    @InjectModel(TeamMember.name)
    private teamMemberModel: Model<TeamMemberDocument>,
    @InjectModel(Project.name) private projectModel: Model<ProjectDocument>,
    @InjectConnection() private readonly connection: Connection,
  ) {}

  async createTeamMembers(
    createTeamMembersDto: CreateTeamMemberDto,
  ): Promise<TeamMember | {message: string}> {
    const exisitingTeamMember = this.teamMemberModel.findOne({_id: createTeamMembersDto.userId, email: createTeamMembersDto.email})

    if(exisitingTeamMember){
      return {
       message:  'Teammember already exisit with this email'
      }
    }
    const createdTeamMembers =
      await this.teamMemberModel.create(createTeamMembersDto);
    return createdTeamMembers;
  }

  async getTeamMembers(id: string): Promise<TeamMember[]> {
    return this.teamMemberModel.find({ userId: id }).exec();
  }

  async addToProject(
    teamMemberIds: string[],
    projectId: string,
  ): Promise<Project> {
    try {
      teamMemberIds.forEach(async (id) => {
        await this.teamMemberModel.updateOne(
          { _id: id },
          { $addToSet: { projects: projectId } },
        );
      });

      const updatedProject = await this.projectModel.findByIdAndUpdate(
        projectId,
        { $addToSet: { teamMembers: teamMemberIds } },
      );

      return updatedProject;
    } catch (error) {
      throw error;
    }
  }
}
