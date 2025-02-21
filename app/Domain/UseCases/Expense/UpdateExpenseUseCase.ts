import { IRepository } from "@domain/Repositories/IRepository";
import { Expense } from "@domain/Models/Expense";
import { IUseCase, IParams } from "@domain/UseCases/IUseCase";

export class UpdateExpenseUseCase implements IUseCase<UpdateExpenseParams,Expense | null> {
  constructor(private repository: IRepository<Expense>) {}

  async execute(params: UpdateExpenseParams): Promise<Expense | null> {
    return await this.repository.update(params.id,params.item);
  }
}

export class UpdateExpenseParams implements IParams {
  constructor(public id: string, public item: Partial<Expense>) {}
}
