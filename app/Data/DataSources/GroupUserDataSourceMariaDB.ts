import { prisma } from "@/prisma";
import { GroupUserDTO } from "@data/DTOs/GroupUserDTO";
import { IDataSource } from "@data/DataSources/IDataSource";

export class GroupUserDataSourceMariaDB implements IDataSource<GroupUserDTO>{
  private static instance: GroupUserDataSourceMariaDB;
  private table;

  private constructor() {
    this.table = prisma.expenseGroupUser;
  }
  
  public static getInstance(): GroupUserDataSourceMariaDB {
    if (!GroupUserDataSourceMariaDB.instance) {
      GroupUserDataSourceMariaDB.instance = new GroupUserDataSourceMariaDB();
    }
    return GroupUserDataSourceMariaDB.instance;
  }

  async fetchAll(): Promise<GroupUserDTO[]> {
    return this.table.findMany();
  }

  async fetchById(id: string): Promise<GroupUserDTO> {
    return this.table.findUniqueOrThrow({where: { id }});
  }

  async fetchByUserId(userId: string): Promise<GroupUserDTO[]> {
    return this.table.findMany({where: { userId }});
  }

  async fetchByGroupId(groupId: string): Promise<GroupUserDTO[]> {
    return this.table.findMany({where: { groupId }});
  }

  async create(item: GroupUserDTO): Promise<GroupUserDTO> {
    console.log(item);
    return this.table.create({
      data: {
	date: item.name,
      },
    })
  }

  async update(id: string, item: Partial<GroupUserDTO>): Promise<GroupUserDTO> {
    return this.table.update({
      where: { id: id },
      data: item,
    });
  }

  async delete(id: string): Promise<GroupUserDTO> {
    return this.table.delete({ where: { id: id } });
  }
}
