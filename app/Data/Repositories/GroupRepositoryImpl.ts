import { Group } from "@domain/Models/Group";
import { GroupDataSourceMariaDB } from "@data/DataSources/GroupDataSourceMariaDB";
import { GroupDTO } from "@data/DTOs/GroupDTO";
import { RepositoryImpl } from "@data/Repositories/RepositoryImpl";

export class GroupRepositoryImpl extends RepositoryImpl<Group, GroupDTO>{
  private static instance: GroupRepositoryImpl;

  private constructor() {
    super(GroupDataSourceMariaDB.getInstance());
  }

  public static getInstance(): GroupRepositoryImpl {
    if (!GroupRepositoryImpl.instance) {
      GroupRepositoryImpl.instance = new GroupRepositoryImpl();
    }
    return GroupRepositoryImpl.instance;
  }

  protected mapToModel(dto: GroupDTO) {
    return Group.parseDTO(dto);
  }
}
