import { IRepository } from "@domain/Repositories/IRepository";
import { Group } from "@domain/Models/Group";
import { IUseCase, IParams } from "@domain/UseCases/IUseCase";

export class CreateGroupUseCase implements IUseCase<CreateGroupParams,Group> {
  constructor(private repository: IRepository<Group>) {}

  async execute(params: CreateGroupParams): Promise<Group> {
    return await this.repository.create(params.item);
  }
}

export class CreateGroupParams implements IParams {
  constructor(public item: Group) {}
}
