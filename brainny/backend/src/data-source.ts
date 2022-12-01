/* eslint-disable prettier/prettier */
import { DataSource } from 'typeorm';
import 'dotenv/config';
import 'reflect-metadata';
import User from './db/models/user.entity';
import Records from './db/models/record.entity';

export const appDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [User, Records],
  migrations: ['dist/db/migrations/*.js'],
});
