import { IUserRepository } from "../../Domain/Repositories/IUserRepository";
import { User } from "../../Domain/Models/User";
import { RepositoryImpl } from "./RepositoryImpl";
import { UserDataSourceLocal } from "../DataSources/UserDataSourceLocal";
import { UserDTO } from "../DTOs/UserDTO";
import { AuthServices } from "../../Services/AuthServices";

export class UserRepositoryImpl extends RepositoryImpl<User, UserDTO> implements IUserRepository<{accessToken: string, refreshToken: string}> {
  private static instance: UserRepositoryImpl;
  private authServices: AuthServices;

  private constructor() {
    super(UserDataSourceLocal.getInstance());
    this.authServices = AuthServices.getInstance();
  }

  public static getInstance(): UserRepositoryImpl {
    if (!UserRepositoryImpl.instance) {
      UserRepositoryImpl.instance = new UserRepositoryImpl();
    }
    return UserRepositoryImpl.instance;
  }

  protected mapToModel(dto: UserDTO) {
    return User.parseDTO(dto);
  }

  async logIn(email: string, password: string): Promise<{accessToken: string, refreshToken: string}> {
    const dto = await this.dataSource.fetchByEmail(email);
    if (!(await this.authServices.comparePasswords(password, dto.password))) {
      throw "Invalid Credential";
    }
    const accessToken = this.authServices.generateToken(dto.id, "1h");
    const refreshToken = this.authServices.generateToken(dto.id, "7d");
    return {accessToken,refreshToken};
  }
}
