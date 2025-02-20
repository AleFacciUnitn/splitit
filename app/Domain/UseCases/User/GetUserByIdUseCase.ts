import { IRepository } from "../../Repositories/IRepository";
import { User } from "../../Models/User";
import { IUseCase,IParams } from "../IUseCase";

export class GetUserByIdUseCase implements IUseCase<GetUserByIdParams,User | null> {
  constructor(private repository: IRepository<User>) {}

  async execute(params: GetUserByIdParams): Promise<User | null> {
    return await this.repository.fetchById(params.id);
  }
}

export class GetUserByIdParams implements IParams {
  constructor(public id: string) {}
}
