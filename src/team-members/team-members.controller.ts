import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { TeamMembersService } from './team-members.service';
import { CreateTeamMemberDto } from '../project/project.dto';
import { AddToProjectDto } from './team-members.dto';



@Controller('team-members')
export class TeamMembersController {
  constructor(private readonly teamMembersService: TeamMembersService) {}

  @Post()
  createTeamMembers(@Body() createTeamMembers: CreateTeamMemberDto) {
    return this.teamMembersService.createTeamMembers(createTeamMembers);
  }

  @Post('add-to-project')
  addToProject(@Body() body: AddToProjectDto) {
    return this.teamMembersService.addToProject(body.teamMemberIds, body.projectId);
  }

  @Get(':id')
  getTeamMembers(@Param('id') id: string) {
    return this.teamMembersService.getTeamMembers(id);
  }
} 