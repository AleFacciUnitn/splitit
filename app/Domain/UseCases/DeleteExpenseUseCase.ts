import { IExpenseRepository } from "../Repositories/IExpenseRepository";
import { Expense } from "../Models/Expense";
import { IUseCase,IParams } from "./IUseCase";

export class DeleteExpenseUseCase implements IUseCase<DeleteExpenseParams,boolean> {
  constructor(private expenseRepository: IExpenseRepository) {}

  async execute(params: DeleteExpenseParams): Promise<boolean> {
    return await this.expenseRepository.fetchById(params.id);
  }
}

export class DeleteExpenseParams implements IParams {
  constructor(public id: string) {}
}
