import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TeamMember, TeamMemberSchema } from 'src/schemas/team-member.schema';
    import { Project, ProjectSchema } from 'src/schemas/project-schema';
import { TeamMembersController } from './team-members.controller';
import { TeamMembersService } from './team-members.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: TeamMember.name, schema: TeamMemberSchema }, { name: Project.name, schema: ProjectSchema }]),
  ],
  controllers: [TeamMembersController],
  providers: [TeamMembersService],
})
export class TeamMembersModule {} 