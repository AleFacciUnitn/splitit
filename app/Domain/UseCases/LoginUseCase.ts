import { IUserRepository } from "@domain/Repositories/IUserRepository";
import { User } from "@domain/Models/User";
import { IUseCase,IParams } from "@domain/UseCases/IUseCase";

export class LogInUseCaseNextAuth implements IUseCase<LogInParams,User> {
  constructor(private repository: IUserRepository<User>) {}

  async execute(params: LogInParams): Promise<User> {
    return await this.repository.logIn(params.email,params.password);
  }
}

export class LogInParams implements IParams {
  constructor(public email: string,public password: string) {}
}
