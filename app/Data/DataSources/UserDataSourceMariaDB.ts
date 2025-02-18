import { prisma } from "../../../prisma";
import { UserDTO } from "../DTOs/ExpenseDTO";
import { IDataSource } from "./IDataSource";
import { GetDBSettings, IDBSettings } from "../../Services/GetDBSettings";
import { AuthServices } from "../../Services/AuthServices";

export class UserDataSourceMariaDB implements IDataSource<UserDTO>{
  private static instance: UserDataSourceMariaDB;
  private authServices: AuthServices;

  private constructor() {
    this.authServices = AuthServices.getInstance();
  }
  
  public static getInstance(): UserDataSourceMariaDB {
    if (!UserDataSourceMariaDB.instance) {
      UserDataSourceMariaDB.instance = new UserDataSourceMariaDB();
    }
    return UserDataSourceMariaDB.instance;
  }

  async fetchAll(): Promise<UserDTO[]> {
    return prisma.user.findMany();
  }

  async fetchById(id: string): Promise<UserDTO> {
    return prisma.user.findUniqueOrThrow({ where: { id } });
  }

  async fetchByEmail(email: string): Promise<UserDTO> {
    return prisma.user.findUniqueOrThrow({ where: { email } });
  }

  async create(item: UserDTO): Promise<UserDTO> {
    const hashedPassword = await this.authServices.hashPassword(item.password);
    item.password = hashedPassword;
    return prisma.user.create({
      data: {
	email: item.email,
	password: item.password
      },
    })
  }

  async update(id: string, item: Partial<UserDTO>): Promise<UserDTO> {
    return prisma.user.update({
      where: { id },
      data: item,
    });
  }

  async delete(id: string): Promise<UserDTO> {
    return prisma.user.delete({ where: { id } });
  }
}
