import { Group } from "../../Domain/Models/Group";
import { GroupDataSourceMariaDB } from "../DataSources/GroupDataSourceMariaDB";
import { GroupDTO } from "../DTOs/GroupDTO";
import { RepositoryImpl } from "./RepositoryImpl";

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
