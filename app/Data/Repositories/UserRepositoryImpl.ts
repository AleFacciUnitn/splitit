import { IUserRepository } from "@domain/Repositories/IUserRepository";
import { User } from "@domain/Models/User";
import { RepositoryImpl } from "@data/Repositories/RepositoryImpl";
import { UserDataSourceLocal } from "@data/DataSources/UserDataSourceLocal";
import { UserDTO } from "@data/DTOs/UserDTO";
import { AuthServices } from "@services/AuthServices";

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
