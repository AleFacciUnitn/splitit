import { IRepository } from "@domain/Repositories/IRepository";
import { User } from "@domain/Models/User";
import { IUseCase, IParams } from "@domain/UseCases/IUseCase";

export class GetUserByIdUseCase implements IUseCase<GetUserByIdParams,User | null> {
  constructor(private repository: IRepository<User>) {}

  async execute(params: GetUserByIdParams): Promise<User | null> {
    return await this.repository.fetchById(params.id);
  }
}

export class GetUserByIdParams implements IParams {
  constructor(public id: string) {}
}
