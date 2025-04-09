import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Project, ProjectSchema } from 'src/schemas/project-schema';
import { ProjectsController } from './project.controller';
import { ProjectsService } from './project.service';
import { TeamMember, TeamMemberSchema } from 'src/schemas/team-member.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Project.name, schema: ProjectSchema }, { name: TeamMember.name, schema: TeamMemberSchema }]),
  ],
  controllers: [ProjectsController],
  providers: [ProjectsService],
})
export class ProjectsModule {}