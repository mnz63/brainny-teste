/* eslint-disable prettier/prettier */
import { Args, Query, Resolver } from '@nestjs/graphql';
import User from 'src/db/models/user.entity';
import { UsersService } from 'src/users/users.service';


@Resolver()
class UserResolver {
  constructor(
    private readonly userService: UsersService) {}

  @Query(() => User)
  getUser(@Args('email') email : string): Promise<User> {
    return this.userService.findOne(email)
  }

  @Query(() => User)
  getById(@Args('id') id : number): Promise<User> {
    return this.userService.findById(id)
  }
  
}
export default UserResolver;
