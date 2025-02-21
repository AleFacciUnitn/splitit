import { IRepository } from "@domain/Repositories/IRepository";
import { Expense } from "@domain/Models/Expense";
import { IUseCase,IParams } from "@domain/UseCases/IUseCase";

export class GetExpenseByIdUseCase implements IUseCase<GetExpenseByIdParams,Expense | null> {
  constructor(private repository: IRepository<Expense>) {}

  async execute(params: GetExpenseByIdParams): Promise<Expense | null> {
    return await this.repository.fetchById(params.id);
  }
}

export class GetExpenseByIdParams implements IParams {
  constructor(public id: string) {}
}
