import { Module } from '@nestjs/common';
import { ToDoService } from './to-do.service';
import { ToDoController } from './to-do.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ToDoEntity } from './entities/to-do.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ToDoEntity])],
  controllers: [ToDoController],
  providers: [ToDoService],
})
export class ToDoModule {}
