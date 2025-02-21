import { GroupUserDTO } from "@data/DTOs/GroupUserDTO";
import { IModel } from "@domain/Models/IModel";

export class GroupUser implements IModel<GroupUserDTO> {
  constructor(
    public userId: string,
    public groupId: string,
  ) {}

  public serializeDTO(): GroupUserDTO {
    return {...this};
  }

  public static parseDTO(dto: GroupUserDTO): GroupUser {
    return new GroupUser(
      dto.userId,
      dto.groupId,
    );
  }
}
