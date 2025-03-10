import { GroupDTO } from "@data/DTOs/GroupDTO";
import { IModel } from "@domain/Models/IModel";

export class Group implements IModel<GroupDTO> {
  constructor(
    public id: string,
    public name: string,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}

  public serializeDTO(): GroupDTO {
    return {...this};
  }

  public static parseDTO(dto: GroupDTO): Group {
    return new Group(
      dto.id,
      dto.name,
      dto.createdAt,
      dto.updatedAt,
    );
  }
}
