import { GroupUser } from "@domain/Models/GroupUser";
import { IGroupUserRepository } from "@domain/Repositories/IGroupUserRepository";
import { GroupUserDataSourceMariaDB } from "@data/DataSources/GroupUserDataSourceMariaDB";
import { GroupUserDTO } from "@data/DTOs/GroupUserDTO";
import { RepositoryImpl } from "@data/Repositories/RepositoryImpl";

export class GroupUserRepositoryImpl extends RepositoryImpl<GroupUser, GroupUserDTO> implements IGroupUserRepository<GroupUser>{
  private static instance: GroupRepositoryImpl;

  private constructor() {
    super(GroupUserDataSourceMariaDB.getInstance());
  }

  public static getInstance(): GroupUserRepositoryImpl {
    if (!GroupUserRepositoryImpl.instance) {
      GroupUserRepositoryImpl.instance = new GroupUserRepositoryImpl();
    }
    return GroupUserRepositoryImpl.instance;
  }

  protected mapToModel(dto: GroupUserDTO) {
    return GroupUser.parseDTO(dto);
  }

  async fetchByUserId(id: string): Promise<GroupUser[] | null> {
    return this.dataSource.fetchByUserId(id);
  }

  async fetchByGroupId(id: string): Promise<GroupUser[] | null> {
    return this.dataSource.fetchByGroupId(id);
  }
}
