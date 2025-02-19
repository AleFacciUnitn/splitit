import { GroupDTO } from "../../Data/DTOs/GroupDTO";
import { IModel } from "./IModel";

export class Group implements IModel<GroupDTO> {
  constructor(
    public id: string | null,
    public name: string,
  ) {}

  public serializeDTO(): GroupDTO {
    return {...this};
  }

  public static parseDTO(dto: GroupDTO): Group {
    return new User(
      dto.id,
      dto.name,
    );
  }
}
