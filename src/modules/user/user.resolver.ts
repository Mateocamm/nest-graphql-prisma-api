import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { DeleteUserInput, User, createUserInput } from './user.dto';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => [User])
  async users() {
    return await this.userService.getAll();
  }

  @Mutation(() => User)
  async createUser(@Args('input') input: createUserInput) {
    const newUser = await this.userService.create(input);
    return newUser;
  }

  @Mutation(() => User)
  async DeleteUserInput(@Args('input') input: DeleteUserInput) {
    const delUser = this.userService.delete(input);

    return delUser;
  }
}
