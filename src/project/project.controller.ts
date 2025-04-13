import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ProjectsService } from './project.service';
import { CreateProjectDto } from './project.dto';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.create(createProjectDto);
  }

  @Get('details/:id')
  getProjectDetails(@Param('id') id: string) {
    return this.projectsService.getProjectDetails(id);
  }

  @Get(':id')
  findAll(@Param('id') id: string) {
    return this.projectsService.findAll(id);
  }
}