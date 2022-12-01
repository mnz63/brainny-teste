import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from './db/models/user.entity';
import Records from './db/models/record.entity';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { FooResolver } from './app.service';
import UserResolver from './resolvers/users.resolver';
import RepoModule from './repo.module';
import RecordResolver from './resolvers/records.resolver';

const gqlImports = [UserResolver, RecordResolver];

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '79119074',
      database: 'brainny',
      entities: [User, Records],
    }),
    UsersModule,
    AuthModule,
    RepoModule,
    ...gqlImports,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      playground: true,
    }),
  ],
  controllers: [AppController],
  providers: [FooResolver],
})
export class AppModule {}
