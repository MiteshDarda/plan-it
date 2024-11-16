import { Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { ToDoEntity } from './to-do.entity';
import { BaseEntity } from 'src/database/base.entity';

@Entity('to_do_description')
export class ToDoDescriptionEntity extends BaseEntity {
  //? To-do ========================================================================================
  @ManyToOne(() => ToDoEntity, (toDo) => toDo.descriptions, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  toDo: ToDoEntity;

  //? Self-referential relationship ================================================================
  @OneToOne(() => ToDoDescriptionEntity, { nullable: true })
  @JoinColumn({ name: 'parent_description_id' })
  parentDescription: ToDoDescriptionEntity;

  @OneToOne(
    () => ToDoDescriptionEntity,
    (description) => description.parentDescription,
    { nullable: true },
  )
  childDescription: ToDoDescriptionEntity;
}
