import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { DeleteUserInput, createUserInput } from './user.dto';
import { ApolloError } from 'apollo-server-errors';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return this.prisma.user.findMany();
  }

  async create(input: createUserInput) {
    const user = await this.prisma.user.findUnique({
      where: { email: input.email },
    });

    if (user) {
      throw new ApolloError('User with this email already exists');
    }

    return this.prisma.user.create({
      data: {
        email: input.email,
        name: input.name,
      },
    });
  }

  async delete(input: DeleteUserInput) {
    const user = await this.prisma.user.findUnique({ where: { id: input.id } });

    if (!user) {
      throw new ApolloError('User with this id does not exist.');
    }

    await this.prisma.user.delete({ where: { id: input.id } });

    return user;
  }
}
