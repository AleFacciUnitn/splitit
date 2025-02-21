import { IRepository } from "@domain/Repositories/IRepository";
import { Expense } from "@domain/Models/Expense";
import { IUseCase, NoParams } from "@domain/UseCases/IUseCase";

export class GetExpensesUseCase implements IUseCase<NoParams,Expense[]> {
  constructor(private repository: IRepository<Expense>) {}

  async execute(params: NoParams): Promise<Expense[]> {
    return await this.repository.fetchAll();
  }
}
