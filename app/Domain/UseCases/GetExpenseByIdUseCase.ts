import { IRepository } from "../Repositories/IRepository";
import { Expense } from "../Models/Expense";
import { IUseCase,IParams } from "./IUseCase";

export class GetExpenseByIdUseCase implements IUseCase<GetExpenseByIdParams,Expense | null> {
  constructor(private repository: IRepository<Expense>) {}

  async execute(params: GetExpenseByIdParams): Promise<Expense | null> {
    return await this.repository.fetchById(params.id);
  }
}

export class GetExpenseByIdParams implements IParams {
  constructor(public id: string) {}
}
