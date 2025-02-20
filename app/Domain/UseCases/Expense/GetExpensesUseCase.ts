import { IRepository } from "../../Repositories/IRepository";
import { Expense } from "../../Models/Expense";
import { IUseCase, NoParams } from "../IUseCase";

export class GetExpensesUseCase implements IUseCase<NoParams,Expense[]> {
  constructor(private repository: IRepository<Expense>) {}

  async execute(params: NoParams): Promise<Expense[]> {
    return await this.repository.fetchAll();
  }
}
