import { prisma } from "@/prisma";
import { GroupDTO } from "@data/DTOs/GroupDTO";
import { IDataSource } from "@data/DataSources/IDataSource";

export class GroupDataSourceMariaDB implements IDataSource<GroupDTO>{
  private static instance: GroupDataSourceMariaDB;
  private table;

  private constructor() {
    this.table = prisma.expenseGroup;
  }
  
  public static getInstance(): GroupDataSourceMariaDB {
    if (!GroupDataSourceMariaDB.instance) {
      GroupDataSourceMariaDB.instance = new GroupDataSourceMariaDB();
    }
    return GroupDataSourceMariaDB.instance;
  }

  async fetchAll(): Promise<GroupDTO[]> {
    return this.table.findMany();
  }

  async fetchById(id: string): Promise<GroupDTO> {
    return this.table.findUniqueOrThrow({where: { id }});
  }

  async create(item: GroupDTO): Promise<GroupDTO> {
    console.log(item);
    return this.table.create({
      data: {
	date: item.name,
      },
    })
  }

  async update(id: string, item: Partial<GroupDTO>): Promise<GroupDTO> {
    return this.table.update({
      where: { id: id },
      data: item,
    });
  }

  async delete(id: string): Promise<GroupDTO> {
    return this.table.delete({ where: { id: id } });
  }
}
