import { Injectable } from '@nestjs/common';
import { CreateToDoDto } from './dto/create-to-do.dto';
import { UpdateToDoDto } from './dto/update-to-do.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ToDoEntity } from './entities/to-do.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class ToDoService {
  constructor(
    @InjectRepository(ToDoEntity)
    private readonly userRepository: Repository<ToDoEntity>,
    private dataSource: DataSource,
  ) {}

  create(createToDoDto: CreateToDoDto) {
    throw new Error('Method not implemented.');
    try {
    } catch (error) {}
  }

  findAll() {
    return `This action returns all toDo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} toDo`;
  }

  update(id: number, updateToDoDto: UpdateToDoDto) {
    return `This action updates a #${id} toDo`;
  }

  remove(id: number) {
    return `This action removes a #${id} toDo`;
  }
}
