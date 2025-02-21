import { IRepository } from "@domain/Repositories/IRepository";
import { Group } from "@domain/Models/Expense";
import { IUseCase, NoParams } from "@domain/UseCases/IUseCase";

export class GetGroupsUseCase implements IUseCase<NoParams,Group[]> {
  constructor(private repository: IRepository<Group>) {}

  async execute(params: NoParams): Promise<Group[]> {
    return await this.repository.fetchAll();
  }
}
