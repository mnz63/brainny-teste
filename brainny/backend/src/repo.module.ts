/* eslint-disable prettier/prettier */
import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Records from './db/models/record.entity';
import User from './db/models/user.entity';
import RepoService from './repo.service';
import { UsersService } from './users/users.service';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([User, Records]),
  ],
  providers: [RepoService, UsersService],
  exports: [RepoService, UsersService],
})
class RepoModule {

}
export default RepoModule;