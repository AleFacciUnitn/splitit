import { IUserRepository } from "../../Domain/Repositories/IUserRepository";
import { User } from "../../Domain/Models/User";
import { RepositoryImpl } from "./RepositoryImpl";
import { UserDataSourceLocal } from "../DataSources/UserDataSourceLocal";
import { UserDTO } from "../DTOs/UserDTO";
import { AuthServices } from "../../Services/AuthServices";

export class UserRepositoryNextAuthImpl extends RepositoryImpl<User, UserDTO> implements IUserRepository<User> {
  private static instance: UserRepositoryNextAuthImpl;
  private authServices: AuthServices;

  private constructor() {
    super(UserDataSourceLocal.getInstance());
    this.authServices = AuthServices.getInstance();
  }

  public static getInstance(): UserRepositoryNextAuthImpl {
    if (!UserRepositoryNextAuthImpl.instance) {
      UserRepositoryNextAuthImpl.instance = new UserRepositoryNextAuthImpl();
    }
    return UserRepositoryNextAuthImpl.instance;
  }

  protected mapToModel(dto: UserDTO) {
    return User.parseDTO(dto);
  }

  async logIn(email: string, password: string): Promise<User> {
    const dto = await this.dataSource.fetchByEmail(email);
    if (!(await this.authServices.comparePasswords(password, dto.password))) {
      throw "Invalid Credential";
    }
    return User.parseDTO(dto);
  }
}
