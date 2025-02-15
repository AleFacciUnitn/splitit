import { IExpenseRepository } from "../Repositories/IExpenseRepository";
import { Expense } from "../Models/Expense";
import { IUseCase, NoParams } from "./IUseCase";

export class GetExpensesUseCase implements IUseCase<NoParams,Expense[]> {
  constructor(private repository: IExpenseRepository) {}

  async execute(params: NoParams): Promise<Expense[]> {
    return await this.repository.fetchAll();
  }
}
