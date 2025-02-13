import { IExpenseRepository } from "../Repositories/IExpenseRepository.ts";
import { Expense } from "../Models/Expense.ts";
import { IUseCase,IParams } from "./IUseCase.ts";

export class DeleteExpenseUseCase implements IUseCase<DeleteExpenseParams,boolean> {
  constructor(private expenseRepository: IExpenseRepository) {}

  async execute(DeleteExpenseParams): Promise<boolean> {
    return await this.expenseRepository.fetchById(DeleteExpenseParams.id);
  }
}

export class DeleteExpenseParams implements IParams {
  constructor(public id: string) {}
}
