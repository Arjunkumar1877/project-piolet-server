import { Controller, Get, Post, Body } from '@nestjs/common';
import { ProjectsService } from './project.service';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  create(@Body() createProjectDto: any) {
    return this.projectsService.create(createProjectDto);
  }

  @Get()
  findAll() {
    return this.projectsService.findAll();
  }
}