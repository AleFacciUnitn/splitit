import { IUserRepository } from "../Repositories/IUserRepository";
import { User } from "../Models/User";
import { IUseCase,IParams } from "./IUseCase";

export class DeleteUserUseCase implements IUseCase<DeleteUserParams,boolean> {
  constructor(private repository: IUserRepository) {}

  async execute(params: DeleteUserParams): Promise<boolean> {
    return await this.repository.fetchById(params.id);
  }
}

export class DeleteUserParams implements IParams {
  constructor(public id: string) {}
}
