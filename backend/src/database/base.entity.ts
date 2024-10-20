import {
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';

/**
 * Base entity class that includes common columns for all entities.
 * - id: Primary key column
 * - isActive: Column that indicates if the entity is active
 * - isArchived: Column that indicates if the entity is archived
 * - createDateTime: Column that stores the date and time when the entity was created
 * - createdBy: Column that stores the name of the user who created the entity
 * - lastChangedDateTime: Column that stores the date and time when the entity was last changed
 * - lastChangedBy: Column that stores the name of the user who last changed the entity
 */
export abstract class BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'is_active',
    type: 'boolean',
    default: true,
  })
  isActive: boolean;

  @Column({
    name: 'is_archived',
    type: 'boolean',
    default: false,
  })
  isArchived: boolean;

  @CreateDateColumn({
    name: 'create_date_time',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createDateTime: Date;

  @Column({
    name: 'created_by',
    type: 'varchar',
    length: 300,
    nullable: true,
  })
  createdBy: string | null;

  @UpdateDateColumn({
    name: 'last_changed_date_time',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  lastChangedDateTime: Date;

  @Column({
    name: 'last_changed_by',
    type: 'varchar',
    length: 300,
    nullable: true,
  })
  lastChangedBy: string | null;

  @Column({
    name: 'internal_comment',
    type: 'varchar',
    length: 300,
    nullable: true,
  })
  internalComment: string | null;
}
