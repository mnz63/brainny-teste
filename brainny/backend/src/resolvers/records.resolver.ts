/* eslint-disable prettier/prettier */
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import Records from 'src/db/models/record.entity';
import User from 'src/db/models/user.entity';
import RepoService from 'src/repo.service';
import { UsersService } from 'src/users/users.service'  ;

@Resolver(()=> Records)
class RecordResolver {
  constructor(
    private readonly repoService: RepoService,
    private readonly userService: UsersService) {}

  @Query(() => [Records])
  public async getRecords() : Promise<Records[]> {
    return this.repoService.recordRepo.find()
  }

  @Query(() => [Records])
  public async getRecordsFromUser(@Args('userId') userId : number) : Promise<Records[]> {
    return this.repoService.recordRepo.find({
        where : {userId}
    })
  }

  @Mutation(()=> Records)
  public async createRecord(@Args('userId') userId: number) : Promise<Records> {
    const record = this.repoService.recordRepo.create({userId: userId})
    return this.repoService.recordRepo.save(record);
  }

  @ResolveField(()=> User, {name: 'user'})
  public async getUser(@Parent() parent: Records) : Promise<User> {
    return this.userService.findById(parent.userId)
  }

}
export default RecordResolver;