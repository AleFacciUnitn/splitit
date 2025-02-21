import { IRepository } from "@domain/Repositories/IRepository";
import { Expense } from "@domain/Models/Expense";
import { IUseCase,IParams } from "@domain/UseCases/IUseCase";

export class DeleteExpenseUseCase implements IUseCase<DeleteExpenseParams,boolean> {
  constructor(private repository: IRepository<Expense>) {}

  async execute(params: DeleteExpenseParams): Promise<boolean> {
    return await this.repository.fetchById(params.id);
  }
}

export class DeleteExpenseParams implements IParams {
  constructor(public id: string) {}
}
