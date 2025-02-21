import { IExpenseRepository } from "@domain/Repositories/IExpenseRepository";
import { Expense } from "@domain/Models/Expense";
import { IUseCase,IParams } from "@domain/UseCases/IUseCase";

export class GetExpensesByUserIdUseCase implements IUseCase<GetExpensesByUserIdParams,Expense[] | null> {
  constructor(private repository: IExpenseRepository<Expense>) {}

  async execute(params: GetExpensesByUserIdParams): Promise<Expense[] | null> {
    return await this.repository.fetchByUserId(params.id);
  }
}

export class GetExpensesByUserIdParams implements IParams {
  constructor(public id: string) {}
}
