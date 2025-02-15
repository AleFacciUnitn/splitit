import { IUserRepository } from "../Repositories/IUserRepository";
import { User } from "../Models/User";
import { IUseCase, IParams } from "./IUseCase";

export class UpdateUserUseCase implements IUseCase<UpdateUserParams,User | null> {
  constructor(private repository: IExpenseRepository) {}

  async execute(params: UpdateUserParams): Promise<User | null> {
    return await this.repository.update(params.id,params.item);
  }
}

export class UpdateUserParams implements IParams {
  constructor(public id: string, public item: Partial<User>) {}
}
