import { User } from '@core/domain/user/entity/User';
import {
  CountUserParams,
  CreateUserParams,
  FindUserParams,
  FindUsersParams,
  UpdateUserParams,
  UserRepositoryPort,
} from '@core/domain/user/port/persistence/UserRepositoryPort';

import { PrismaService } from '@core/service/PrismaService';
import { PrismaUserMapper } from 'src/infrastructure/persistence/prisma/entity/user/mapper/PrismaUserMapper';
import { buildQueryPagination } from 'src/infrastructure/persistence/prisma/utility/PrismaQueryUtility';

export default class PrismaUserRepositoryAdapter implements UserRepositoryPort {
  constructor(private prismaService: PrismaService) {}
  async findUser(params: FindUserParams): Promise<User> {
    const entity = await this.prismaService.users.findFirst({
      ...params,
    });

    if (!entity) {
      return null;
    }

    return PrismaUserMapper.toDomain(entity);
  }

  async findUsers(params: FindUsersParams): Promise<User[]> {
    const entities = await this.prismaService.users.findMany({
      where: params.where,
      include: params.include,
      orderBy: params.orderBy,
      ...buildQueryPagination(params.pagination),
    });

    return PrismaUserMapper.toDomains(entities);
  }

  async createUser(params: CreateUserParams): Promise<User> {
    const { data, include } = params;
    const userData = await PrismaUserMapper.toEntity(data);

    const entity = await this.prismaService.users.create({
      data: userData,
      include,
    });

    return PrismaUserMapper.toDomain(entity);
  }

  async updateUser(params: UpdateUserParams): Promise<User> {
    const { data, include, where } = params;
    const userData = await PrismaUserMapper.toEntity(data);

    const entity = await this.prismaService.users.update({
      data: userData,
      where,
      include,
    });

    return PrismaUserMapper.toDomain(entity);
  }

  async countUsers(params: CountUserParams): Promise<number> {
    return this.prismaService.users.count(params);
  }
}
