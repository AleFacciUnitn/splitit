import { IGroupUserRepository } from "@domain/Repositories/IGroupUserRepository";
import { GroupUser } from "@domain/Models/GroupUser";
import { IUseCase,IParams } from "@domain/UseCases/IUseCase";

export class GetGroupUsersByGroupIdUseCase implements IUseCase<GetGroupUsersByGroupIdParams,GroupUser[] | null> {
  constructor(private repository: IGroupUserRepository<GroupUser>) {}

  async execute(params: GetGroupUsersByGroupIdParams): Promise<GroupUser[] | null> {
    return await this.repository.fetchByGroupId(params.id);
  }
}

export class GetGroupUsersByGroupIdParams implements IParams {
  constructor(public id: string) {}
}
