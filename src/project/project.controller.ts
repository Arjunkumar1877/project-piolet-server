import { Controller, Get, Post, Body, Param, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { ProjectsService } from './project.service';
import { CreateProjectDto, CreateTeamMemberDto } from './project.dto';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.create(createProjectDto);
  }

  @Get('details/:id')
  async getProjectDetails(@Param('id') id: string) {
    console.log('Getting project details for ID:', id);
    try {
      const project = await this.projectsService.getProjectDetails(id);
      if (!project) {
        throw new NotFoundException(`Project with ID ${id} not found`);
      }
      return project;
    } catch (error) {
      console.error('Error getting project details:', error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(error.message);
    }
  }

  @Post('team-members')
  createTeamMembers(@Body() createTeamMembers: CreateTeamMemberDto){
    return this.projectsService.createTeamMembers(createTeamMembers)
  }

  @Get('team-members/:id')
  getTeamMembers(@Param('id') id: string){
    return this.projectsService.getTeamMembers(id)
  }

  @Get(':id')
  findAll(@Param('id') id: string) {
    return this.projectsService.findAll(id);
  }
}