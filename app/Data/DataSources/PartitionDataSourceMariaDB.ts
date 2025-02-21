import { prisma } from "@/prisma";
import { PartitionDTO } from "@data/DTOs/PartitionDTO";
import { IDataSource } from "@data/DataSources/IDataSource";

export class PartitionDataSourceMariaDB implements IDataSource<ExpenseDTO>{
  private static instance: PartitionDataSourceMariaDB;
  private table;

  private constructor() {
    this.table = prisma.partitionExpense;
  }
  
  public static getInstance(): PartitionDataSourceMariaDB {
    if (!PartitionDataSourceMariaDB.instance) {
      PartitionDataSourceMariaDB.instance = new PartitionDataSourceMariaDB();
    }
    return PartitionDataSourceMariaDB.instance;
  }

  async fetchAll(): Promise<PartitionDTO[]> {
    return this.table.findMany();
  }

  async fetchById(id: string): Promise<PartitionDTO> {
    return this.table.findUniqueOrThrow({where: { id }});
  }

  async fetchByUserId(userId: string): Promise<PartitionDTO[]> {
    return this.table.findMany({where: { userId }});
  }

  async fetchByExpenseId(expenseId: string): Promise<PartitionDTO[]> {
    return this.table.findMany({where: { expenseId }});
  }

  async create(item: PartitionDTO: Promise<PartitionDTO> {
    console.log(item);
    return this.table.create({
      data: {
        userId: item.userId,
	expenseId: item.expenseId,
	groupId: item.groupId,
	amount: item.amount
      },
    })
  }

  async update(id: string, item: Partial<PartitionDTO>): Promise<PartitionDTO> {
    return this.table.update({
      where: { id: id },
      data: item,
    });
  }

  async delete(id: string): Promise<PartitionDTO> {
    return this.table.delete({ where: { id } });
  }
}
