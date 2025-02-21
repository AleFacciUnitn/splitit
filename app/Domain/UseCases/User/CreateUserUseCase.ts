import { IRepository } from "@domain/Repositories/IRepository";
import { User } from "@domain/Models/User";
import { IUseCase, IParams } from "@domain/UseCases/IUseCase";

export class CreateUserUseCase implements IUseCase<CreateUserParams,User> {
  constructor(private repository: IRepository<User>) {}

  async execute(params: CreateUserParams): Promise<User> {
    return await this.repository.create(params.item);
  }
}

export class CreateUserParams implements IParams {
  constructor(public item: User) {}
}
