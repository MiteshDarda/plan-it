import { Module } from '@nestjs/common';
import { ToDoService } from './to-do.service';
import { ToDoController } from './to-do.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ToDoEntity } from './entities/to-do.entity';
import { ToDoDescriptionEntity } from './entities/to-do-description';

@Module({
  imports: [TypeOrmModule.forFeature([ToDoEntity, ToDoDescriptionEntity])],
  controllers: [ToDoController],
  providers: [ToDoService],
})
export class ToDoModule {}
