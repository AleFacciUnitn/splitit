import { IRepository } from "../../Repositories/IRepository";
import { Group } from "../../Models/Expense";
import { IUseCase, NoParams } from "../IUseCase";

export class GetGroupsUseCase implements IUseCase<NoParams,Group[]> {
  constructor(private repository: IRepository<Group>) {}

  async execute(params: NoParams): Promise<Group[]> {
    return await this.repository.fetchAll();
  }
}
