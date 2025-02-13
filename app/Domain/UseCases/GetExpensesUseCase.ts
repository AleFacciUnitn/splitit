import { IExpenseRepository } from "../Repositories/IExpenseRepository.ts";
import { Expense } from "../Models/Expense.ts";
import { IUseCase, NoParams } from "./IUseCase.ts";

export class GetExpensesUseCase implements IUseCase<NoParams,Expense[]> {
  constructor(private expenseRepository: IExpenseRepository) {}

  async execute(NoParams): Promise<Expense[]> {
    return await this.expenseRepository.fetchAll();
  }
}
