import { IRepository } from "@domain/Repositories/IRepository";
import { Group } from "@domain/Models/Group";
import { IUseCase,IParams } from "@domain/UseCases/IUseCase";

export class GetGroupByIdUseCase implements IUseCase<GetGroupByIdParams,Group | null> {
  constructor(private repository: IRepository<Group>) {}

  async execute(params: GetGroupByIdParams): Promise<Group | null> {
    return await this.repository.fetchById(params.id);
  }
}

export class GetGroupByIdParams implements IParams {
  constructor(public id: string) {}
}
