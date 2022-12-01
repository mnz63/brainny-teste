/* eslint-disable prettier/prettier */
import {
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
  } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import Records from './record.entity';
  
  @ObjectType()
  @Entity("users")
  export default class User {
    @Field()
    @PrimaryGeneratedColumn()
    id: number;
  
    @Field()
    @Column()
    email: string;
  
    @Field()
    @Column()
    name: string;
  
    @Field()
    @Column()
    password: string;

    @Field()
    @Column()
    role: string;
    
    @OneToMany(() => Records, records => records.user)
    records: Promise<Records[]>;
}
  