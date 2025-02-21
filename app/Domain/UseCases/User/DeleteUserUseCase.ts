import { IRepository } from "@domain/Repositories/IRepository";
import { User } from "@domain/Models/User";
import { IUseCase, IParams } from "@domain/UseCases/IUseCase";

export class DeleteUserUseCase implements IUseCase<DeleteUserParams,boolean> {
  constructor(private repository: IRepository<User>) {}

  async execute(params: DeleteUserParams): Promise<boolean> {
    return await this.repository.fetchById(params.id);
  }
}

export class DeleteUserParams implements IParams {
  constructor(public id: string) {}
}
