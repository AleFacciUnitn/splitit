import { IUserRepository } from "../../Domain/Repositories/IUserRepository";
import { User } from "../../Domain/Models/User";
import { IDataSource } from "../DataSources/IDataSource";
import { UserDataSourceLocal } from "../DataSources/UserDataSourceLocal";
import { UserDTO } from "../DTOs/UserDTO";
import { AuthServices } from "../../Services/AuthServices";

export class UserRepositoryNextAuthImpl implements IUserRepository {
  private static instance: UserRepositoryNextAuthImpl;
  private dataSource: IDataSource<ExpenseDTO>;
  private authServices: AuthServices;

  private constructor() {
    this.dataSource = UserDataSourceLocal.getInstance();
    this.authServices = AuthServices.getInstance();
  }

  public static getInstance(): UserRepositoryNextAuthImpl {
    if (!UserRepositoryNextAuthImpl.instance) {
      UserRepositoryNextAuthImpl.instance = new UserRepositoryNextAuthImpl();
    }
    return UserRepositoryNextAuthImpl.instance;
  }

  async fetchAll(): Promise<User[]> {
    const userDTOs = await this.dataSource.fetchAll();
    return userDTOs.map((dto: UserDTO) => User.parseDTO(dto));
  }

  async fetchById(id: string): Promise<User | null> {
    try {
      const dto = await this.dataSource.fetchById(id);
      return User.parseDTO(dto);
    } catch (e) {
      return null;
    }
  }

  async logIn(email: string, password: string): Promise<User> {
    const dto = await this.dataSource.fetchByEmail(email);
    if (!(await this.authServices.comparePasswords(password, dto.password))) {
      throw "Invalid Credential";
    }
    return User.parseDTO(dto);
  }

  async create(item: User): Promise<User> {
    const dto: UserDTO = item.serializeDTO();
    const newUser = await this.dataSource.create(dto);
    return User.parseDTO(newUser);
  }

  async update(id: string, item: Partial<User>): Promise<User | null> {
    try {
      const updatedDTO = await this.dataSource.update(id,item);
      return User.parseDTO(updatedDTO);
    } catch (e) {
      return null;
    }
  }

  async delete(id: string): Promise<boolean> {
    return this.dataSource.delete(id);
  }
}
