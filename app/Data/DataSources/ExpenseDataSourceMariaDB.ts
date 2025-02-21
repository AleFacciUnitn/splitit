import { prisma } from "@/prisma";
import { ExpenseDTO } from "@data/DTOs/ExpenseDTO";
import { IDataSource } from "@data/DataSources/IDataSource";

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
    return this.table.findMany({orderBy: {date: "desc"}});
  }

  async fetchById(id: string): Promise<ExpenseDTO> {
    return this.table.findUniqueOrThrow({where: { id }});
  }

  async fetchByUserId(userId: string): Promise<ExpenseDTO[]> {
    return this.table.findMany({where: { userId }, orderBy: {date: "desc"}});
  }

  async fetchByGroupId(groupId: string): Promise<ExpenseDTO[]> {
    return this.table.findMany({where: { groupId }});
  }

  async create(item: ExpenseDTO): Promise<ExpenseDTO> {
    return this.table.create({
      data: {
        userId: item.userId,
	date: item.date,
	description: item.description,
	category: item.category,
	amount: item.amount,
	groupId: item.groupId
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
