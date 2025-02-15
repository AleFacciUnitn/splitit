import { IUserRepository } from "../Repositories/IUserRepository";
import { User } from "../Models/User";
import { IUseCase, IParams } from "./IUseCase";

export class CreateUserUseCase implements IUseCase<CreateUserParams,User> {
  constructor(private repository: IUserRepository) {}

  async execute(params: CreateUserParams): Promise<User> {
    return await this.repository.create(params.item);
  }
}

export class CreateUserParams implements IParams {
  constructor(public item: User) {}
}
