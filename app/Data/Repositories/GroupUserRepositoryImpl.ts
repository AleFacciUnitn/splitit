import { GroupUser } from "../../Domain/Models/GroupUser";
import { IGroupUserRepository } from "../../Domain/Repositories/IGroupUserRepository";
import { GroupUserDataSourceMariaDB } from "../DataSources/GroupUserDataSourceMariaDB";
import { GroupUserDTO } from "../DTOs/GroupUserDTO";
import { RepositoryImpl } from "./RepositoryImpl";

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
}
