import { Controller, Get, Post, Body } from '@nestjs/common';
import { ProjectsService } from './project.service';
import { CreateProjectDto, CreateTeamMemberDto } from './project.dto';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.create(createProjectDto);
  }
  
  @Post('team-members')
  createTeamMembers(@Body() createTeamMembers: CreateTeamMemberDto){
    return this.projectsService.createTeamMembers(createTeamMembers)
  }

  @Get('team-members')
  getTeamMembers(){
    return this.projectsService.getTeamMembers()
  }

  @Get()
  findAll() {
    return this.projectsService.findAll();
  }
}