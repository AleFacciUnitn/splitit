import { IGroupUserRepository } from "../../Repositories/IGroupUserRepository";
import { GroupUser } from "../../Models/GroupUser";
import { IUseCase,IParams } from "../IUseCase";

export class GetGroupUsersByUserIdUseCase implements IUseCase<GetGroupUsersByUserIdParams,GroupUser[] | null> {
  constructor(private repository: IGroupUserRepository<GroupUser>) {}

  async execute(params: GetGroupUsersByUserIdParams): Promise<GroupUser[] | null> {
    return await this.repository.fetchByUserId(params.id);
  }
}

export class GetGroupUsersByUserIdParams implements IParams {
  constructor(public id: string) {}
}
