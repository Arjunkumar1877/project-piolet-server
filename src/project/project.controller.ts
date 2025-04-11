import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ProjectsService } from './project.service';
import { CreateProjectDto, CreateTeamMemberDto } from './project.dto';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.create(createProjectDto);
  }

  @Get(':id')
  findAll(@Param('id') id: string) {
    return this.projectsService.findAll(id);
  }
  
  @Post('team-members')
  createTeamMembers(@Body() createTeamMembers: CreateTeamMemberDto){
    return this.projectsService.createTeamMembers(createTeamMembers)
  }

  @Get('team-members/:id')
  getTeamMembers(@Param('id') id: string){
    return this.projectsService.getTeamMembers(id)
  }


}