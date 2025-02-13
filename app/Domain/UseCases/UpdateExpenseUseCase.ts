import { IExpenseRepository } from "../Repositories/IExpenseRepository.ts";
import { Expense } from "../Models/Expense.ts";
import { IUseCase, IParams } from "./IUseCase.ts";

export class UpdateExpenseUseCase implements IUseCase<UpdateExpenseParams,Expense> {
  constructor(private expenseRepository: IExpenseRepository) {}

  async execute(UpdateExpenseParams): Promise<Expense> {
    return await this.expenseRepository.update(UpdateExpenseParams.id,UpdateExpenseParams.item);
  }
}

export class UpdateExpenseParams implements IParams {
  constructor(public id: string, public item: Partial<Expense>) {}
}
