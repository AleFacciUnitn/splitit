import { IExpenseRepository } from "../Repositories/IExpenseRepository";
import { Expense } from "../Models/Expense";
import { IUseCase, IParams } from "./IUseCase";

export class CreateExpenseUseCase implements IUseCase<CreateExpenseParams,Expense> {
  constructor(private expenseRepository: IExpenseRepository) {}

  async execute(params: CreateExpenseParams): Promise<Expense> {
    return await this.expenseRepository.create(params.item);
  }
}

export class CreateExpenseParams implements IParams {
  constructor(public item: Expense) {}
}
