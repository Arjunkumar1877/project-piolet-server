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
  ): Promise<TeamMember | {saved: boolean, message: string, data: TeamMember}> {
    const existingTeamMember = await this.teamMemberModel.findOne({
      userId: createTeamMembersDto.userId,
      email: createTeamMembersDto.email
    });

    if(existingTeamMember){
      return {
        saved: false,
        message: 'Team member already exists with this email.',
        data: existingTeamMember
      }
    }
    const createdTeamMembers =
      await this.teamMemberModel.create(createTeamMembersDto);
    return {
      saved: true,
      message: 'Team member created successfully',
      data: createdTeamMembers
    };
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
