import { IRepository } from "../Repositories/IRepository";
import { Group } from "../Models/Group";
import { IUseCase,IParams } from "./IUseCase";

export class GetGroupByIdUseCase implements IUseCase<GetGroupByIdParams,Group | null> {
  constructor(private repository: IRepository<Group>) {}

  async execute(params: GetGroupByIdParams): Promise<Group | null> {
    return await this.repository.fetchById(params.id);
  }
}

export class GetGroupByIdParams implements IParams {
  constructor(public id: string) {}
}
