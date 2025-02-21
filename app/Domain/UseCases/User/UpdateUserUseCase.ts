import { IRepository } from "@domain/Repositories/IRepository";
import { User } from "@domain/Models/User";
import { IUseCase, IParams } from "@domain/UseCases/IUseCase";

export class UpdateUserUseCase implements IUseCase<UpdateUserParams,User | null> {
  constructor(private repository: IRepository<User>) {}

  async execute(params: UpdateUserParams): Promise<User | null> {
    return await this.repository.update(params.id,params.item);
  }
}

export class UpdateUserParams implements IParams {
  constructor(public id: string, public item: Partial<User>) {}
}
