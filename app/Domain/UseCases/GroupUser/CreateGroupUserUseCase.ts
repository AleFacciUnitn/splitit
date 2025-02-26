import { IRepository } from "@domain/Repositories/IRepository";
import { GroupUser } from "@domain/Models/GroupUser";
import { IUseCase, IParams } from "@domain/UseCases/IUseCase";

export class CreateGroupUserUseCase implements IUseCase<CreateGroupUserParams,GroupUser> {
  constructor(private repository: IRepository<GroupUser>) {}

  async execute(params: CreateGroupUserParams): Promise<GroupUser> {
    return await this.repository.create(params.item);
  }
}

export class CreateGroupUserParams implements IParams {
  constructor(public item: GroupUser) {}
}
