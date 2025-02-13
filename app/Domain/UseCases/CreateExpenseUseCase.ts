import { IExpenseRepository } from "../Repositories/IExpenseRepository.ts";
import { Expense } from "../Models/Expense.ts";
import { IUseCase, IParams } from "./IUseCase.ts";

export class CreateExpenseUseCase implements IUseCase<CreateExpenseParams,Expense> {
  constructor(private expenseRepository: IExpenseRepository) {}

  async execute(CreateExpenseParams): Promise<Expense> {
    return await this.expenseRepository.create(CreateExpenseParams.item);
  }
}

export class CreateExpenseParams implements IParams {
  constructor(public item: Expense) {}
}
