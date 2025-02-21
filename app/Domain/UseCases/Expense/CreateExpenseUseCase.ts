import { IRepository } from "@domain/Repositories/IRepository";
import { Expense } from "@domain/Models/Expense";
import { IUseCase, IParams } from "@domain/UseCases/IUseCase";

export class CreateExpenseUseCase implements IUseCase<CreateExpenseParams,Expense> {
  constructor(private repository: IRepository<Expense>) {}

  async execute(params: CreateExpenseParams): Promise<Expense> {
    return await this.repository.create(params.item);
  }
}

export class CreateExpenseParams implements IParams {
  constructor(public item: Expense) {}
}
