import { IRepository } from "./IRepository";
import { User } from "../Models/User"

export class IUserRepository implements IRepository<User> {
  fetchAll(): Promise<User[]>;
  fetchById(id: string): Promise<User | null>;
  logIn(email: string, password: string): Promise<User | null>;
  create(items: User): Promise<User>;
  update(id: string, item: Partial<User>): Promise<User | null>;
  delete(id: string): Promise<boolean>;
}
