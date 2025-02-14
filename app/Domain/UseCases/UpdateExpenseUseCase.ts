import { IExpenseRepository } from "../Repositories/IExpenseRepository";
import { Expense } from "../Models/Expense";
import { IUseCase, IParams } from "./IUseCase";

export class UpdateExpenseUseCase implements IUseCase<UpdateExpenseParams,Expense> {
  constructor(private expenseRepository: IExpenseRepository) {}

  async execute(params: UpdateExpenseParams): Promise<Expense> {
    return await this.expenseRepository.update(params.id,params.item);
  }
}

export class UpdateExpenseParams implements IParams {
  constructor(public id: string, public item: Partial<Expense>) {}
}
