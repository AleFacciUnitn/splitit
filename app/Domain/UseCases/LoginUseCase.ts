import { IUserRepository } from "../Repositories/IUserRepository";
import { User } from "../Models/User";
import { IUseCase,IParams } from "./IUseCase";

export class LogInUseCase implements IUseCase<LogInParams,{accessToken: string, refreshToken: string}> {
  constructor(private repository: IUserRepository) {}

  async execute(params: LogInParams): Promise<{accessToken: string, refreshToken: string}> {
    return await this.repository.logIn(params.email,params.password);
  }
}

export class LogInParams implements IParams {
  constructor(public email: string,public password: string) {}
}
