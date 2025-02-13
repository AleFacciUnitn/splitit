import { IExpenseRepository } from "../Repositories/IExpenseRepository.ts";
import { Expense } from "../Models/Expense.ts";
import { IUseCase,IParams } from "./IUseCase.ts";

export class GetExpenseByIdUseCase implements IUseCase<GetExpenseByIdParams,Expense | null> {
  constructor(private expenseRepository: IExpenseRepository) {}

  async execute(GetExpenseByIdParams): Promise<Expense | null> {
    return await this.expenseRepository.fetchById(GetExpenseByIdParams.id);
  }
}

export class GetExpenseByIdParams implements IParams {
  constructor(public id: string) {}
}
