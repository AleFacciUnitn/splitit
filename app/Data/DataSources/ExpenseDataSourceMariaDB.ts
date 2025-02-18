import { prisma } from "../../../prisma";
import { ExpenseDTO } from "../DTOs/ExpenseDTO";
import { IDataSource } from "./IDataSource";
import { GetDBSettings, IDBSettings } from "../../Services/GetDBSettings";
import { ExpenseNotFoundError } from "../../Core/Error/ExpenseNotFoundError";

export class ExpenseDataSourceMariaDB implements IDataSource<ExpenseDTO>{
  private static instance: ExpenseDataSourceMariaDB;
  private id: number = 0;
  private table;

  private constructor() {
    this.table = prisma.expense;
  }
  
  public static getInstance(): ExpenseDataSourceMariaDB {
    if (!ExpenseDataSourceMariaDB.instance) {
      ExpenseDataSourceMariaDB.instance = new ExpenseDataSourceMariaDB();
    }
    return ExpenseDataSourceMariaDB.instance;
  }

  async fetchAll(): Promise<ExpenseDTO[]> {
    return this.table.findMany();
  }

  async fetchById(id: string): Promise<ExpenseDTO> {
    return this.table.findUniqueOrThrow({where: { id }});
  }

  async fetchByUserId(userId: string): Promise<ExpenseDTO[]> {
    return this.table.findMany({where: { userId }});
  }

  async create(item: ExpenseDTO): Promise<ExpenseDTO> {
    console.log(item);
    return this.table.create({
      data: {
        userId: item.userId,
	date: item.date,
	description: item.description,
	category: item.category,
	amount: item.amount
      },
    })
  }

  async update(id: string, item: Partial<ExpenseDTO>): Promise<ExpenseDTO> {
    return this.table.update({
      where: { id: id },
      data: item,
    });
  }

  async delete(id: string): Promise<ExpenseDTO> {
    return this.table.delete({ where: { id: id } });
  }
}
