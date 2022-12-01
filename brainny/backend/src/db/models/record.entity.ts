/* eslint-disable prettier/prettier */

import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import User from './user.entity';

@ObjectType()
@Entity("registered_time")
export default class Records {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ name: 'user_id' })
  userId: number;

  @Field()
  @CreateDateColumn({ name: 'time_registered' })
  createdAt: Date;

  @JoinColumn({
    name: 'user_id'
  }) 
  @ManyToOne(() => User, (user) => user.records)
  user: User;
}