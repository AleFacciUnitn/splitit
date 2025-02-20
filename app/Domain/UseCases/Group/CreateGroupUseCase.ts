import { IRepository } from "../../Repositories/IRepository";
import { Group } from "../../Models/Group";
import { IUseCase, IParams } from "../IUseCase";

export class CreateGroupUseCase implements IUseCase<CreateGroupParams,Group> {
  constructor(private repository: IRepository<Group>) {}

  async execute(params: CreateGroupParams): Promise<Group> {
    return await this.repository.create(params.item);
  }
}

export class CreateGroupParams implements IParams {
  constructor(public item: Group) {}
}
