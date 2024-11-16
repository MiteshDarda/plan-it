import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ToDoService } from './to-do.service';
import { CreateToDoDto } from './dto/create-to-do.dto';
import { UpdateToDoDto } from './dto/update-to-do.dto';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/roles.enum';
import { AuthGuard as PassportAuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/roles/roles.guard';
import { GetUser } from '../users/users.decorator';
import { User } from '../users/entities/user.entity';
import { ResponseInterceptor } from '@utils/response.interceptor';

@UseInterceptors(ResponseInterceptor)
@Controller('to-do')
export class ToDoController {
  constructor(private readonly toDoService: ToDoService) {}

  //? Create ========================================================================================
  @Post()
  create(@Body() createToDoDto: CreateToDoDto) {
    console.log('createToDoDto', createToDoDto);
    return this.toDoService.create(createToDoDto);
  }

  @Roles([Role.All])
  @UseGuards(PassportAuthGuard('jwt'))
  @UseGuards(RolesGuard)
  @Get()
  findAll(@GetUser() reqUser: User) {
    console.log('reqUser', reqUser);
    return this.toDoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.toDoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateToDoDto: UpdateToDoDto) {
    return this.toDoService.update(+id, updateToDoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.toDoService.remove(+id);
  }
}
