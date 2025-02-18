import { UserDTO } from "../DTOs/UserDTO";
import { IDataSource } from "./IDataSource";
import { UserNotFoundError } from "../../Core/Error/UserNotFoundError";
import { AuthServices } from "../../Services/AuthServices";

export class UserDataSourceLocal implements IDataSource<UserDTO>{
  private static instance: UserDataSourceLocal = new UserDataSourceLocal();
  private id: number = 0;
  private users: UserDTO[] = [];
  private authServices: AuthServices;

  private constructor() {
    this.users = [];
    this.authServices = AuthServices.getInstance();
  }
  
  public static getInstance(): UserDataSourceLocal {
    if (!UserDataSourceLocal.instance) {
      UserDataSourceLocal.instance = new UserDataSourceLocal();
    }
    return UserDataSourceLocal.instance;
  }

  async fetchAll(): Promise<UserDTO[]> {
    return this.users;
  }

  async fetchById(id: string): Promise<UserDTO> {
    const result = this.users.find(item => item.id === id);
    if (!result) throw new UserNotFoundError();
    return result;
  }

  async fetchByEmail(email: string): Promise<UserDTO> {
    const result = this.users.find(item => item.email === email);
    if (!result) throw new UserNotFoundError();
    return result;
  }

  async create(item: UserDTO): Promise<UserDTO> {
    item.id = `${this.id++}`;
    const hashedPassword = await this.authServices.hashPassword(item.password);
    item.password = hashedPassword;
    this.users.push(item);
    return item;
  }

  async update(id: string, item: Partial<UserDTO>): Promise<UserDTO> {
    const index = this.users.findIndex(user => user.id === id);
    if (index === -1) throw new UserNotFoundError();
    this.users[index] = {...this.users[index], ...item};
    return this.users[index];
  }

  async delete(id: string): Promise<boolean> {
    const index = this.users.findIndex(item => item.id === id);
    if (index === -1) return false;
    this.users.splice(index,1);
    return true;
  }
}
