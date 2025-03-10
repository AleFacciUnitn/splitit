import { IUserRepository } from "@domain/Repositories/IUserRepository";
import { User } from "@domain/Models/User";
import { RepositoryImpl } from "@data/Repositories/RepositoryImpl";
import { UserDataSourceMariaDB } from "@data/DataSources/UserDataSourceMariaDB";
import { UserDTO } from "@data/DTOs/UserDTO";
import { AuthServices } from "@services/AuthServices";

export class UserRepositoryNextAuthImpl extends RepositoryImpl<User, UserDTO> implements IUserRepository<User> {
  private static instance: UserRepositoryNextAuthImpl;
  private authServices: AuthServices;

  private constructor() {
    super(UserDataSourceMariaDB.getInstance());
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
