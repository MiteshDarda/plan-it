import { User } from 'src/api/users/entities/user.entity';
import { BaseEntity } from 'src/database/base.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity('to_do')
export class ToDoEntity extends BaseEntity {
  //? Title ========================================================================================
  @Column({
    name: 'title',
    type: 'varchar',
    length: 255,
    nullable: false,
    unique: true,
  })
  title: string;

  //? Sub-Title ========================================================================================
  @Column({
    name: 'sub_title',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  subtitle: string;

  //? Description ========================================================================================
  @Column({
    name: 'description',
    type: 'text',
    nullable: true,
  })
  description: string;

  //? Is Completed ========================================================================================
  @Column({
    name: 'is_completed',
    type: 'boolean',
    default: false,
  })
  isCompleted: boolean;

  //? Weighage ========================================================================================
  @Column({
    name: 'weighage',
    type: 'float',
    default: 0,
  })
  weighage: number;

  //? Due Date ========================================================================================
  @Column({
    name: 'due_date',
    type: 'timestamp',
    nullable: true,
  })
  dueDate: Date;

  //? Children ========================================================================================
  @OneToMany(() => ToDoEntity, (toDo) => toDo.parent, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    cascade: true,
  })
  children: ToDoEntity[];

  //? Parent ========================================================================================
  @ManyToOne(() => ToDoEntity, (toDo) => toDo.children)
  parent: ToDoEntity;

  //? User ========================================================================================
  @ManyToOne(() => User, (user) => user.toDos, {
    nullable: false,
  })
  user: User;
}
