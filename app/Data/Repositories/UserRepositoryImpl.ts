import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { IUserRepository } from "../../Domain/Repositories/IUserRepository";
import { User } from "../../Domain/Models/User";
import { IDataSource } from "../DataSources/IDataSource";
import { UserDataSourceLocal } from "../DataSources/UserDataSourceLocal";
import { UserDTO } from "../DTOs/UserDTO";

export class UserRepositoryImpl implements IUserRepository {
  private static instance: UserRepositoryImpl;
  private dataSource: IDataSource<ExpenseDTO>;

  private constructor() {
    this.dataSource = UserDataSourceLocal.getInstance();
  }

  public static getInstance(): UserRepositoryImpl {
    if (!UserRepositoryImpl.instance) {
      UserRepositoryImpl.instance = new UserRepositoryImpl();
    }
    return UserRepositoryImpl.instance;
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

  async logIn(email: string, password: string): Promise<{accessToken: string, refreshToken: string}> {
    const dto = await this.dataSource.fetchByEmail(email);
    if (!(await bcrypt.compare(password, dto.password))) {
      throw "Invalid Credential";
    }
    const accessToken = jwt.sign({id: dto.id, email: dto.email}, "SECRET_KEY", {expiresIn: "1h"});
    const refreshToken = jwt.sign({id: dto.id}, "SECRET_KEY", {expiresIn: "7d"});
    return {accessToken,refreshToken};
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
