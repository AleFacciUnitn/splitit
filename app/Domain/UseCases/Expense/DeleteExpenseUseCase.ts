import { IRepository } from "../../Repositories/IRepository";
import { Expense } from "../../Models/Expense";
import { IUseCase,IParams } from "../IUseCase";

export class DeleteExpenseUseCase implements IUseCase<DeleteExpenseParams,boolean> {
  constructor(private repository: IRepository<Expense>) {}

  async execute(params: DeleteExpenseParams): Promise<boolean> {
    return await this.repository.fetchById(params.id);
  }
}

export class DeleteExpenseParams implements IParams {
  constructor(public id: string) {}
}
