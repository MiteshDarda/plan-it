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
    private readonly ToDoEntityRepository: Repository<ToDoEntity>,
    private dataSource: DataSource,
  ) {}

  create = async (createToDoDto: CreateToDoDto) => {
    // divide the createToDoDto.description into an array of 3500 characters each
    const descriptionArray = createToDoDto?.description?.match(/.{1,3500}/g);
    console.log('descriptionArray', descriptionArray);
    return {
      data: descriptionArray.length,
    };
    // try {
    //   const toDo = await this.ToDoEntityRepository.createQueryBuilder('to_do')
    //     .insert()
    //     .execute();
    //   return {
    //     data: toDo,
    //   };
    // } catch (error) {}
  };

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
