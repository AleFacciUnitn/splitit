import { PartitionDTO } from "@data/DTOs/PartitionDTO";
import { IModel } from "@domain/Models/IModel";

export class Partition implements IModel {
  constructor(
    public id: string,
    public expenseId: string,
    public userId: string,
    public groupId: string | null,
    public amount: number,
    public updatedAt: Date = new Date(),
  ) {}

  public serializeDTO(): PartitionDTO {
    return {...this};
  }

  public static parseDTO(dto: PartitionDTO): Partition {
    return new Partition(
      dto.id,
      dto.expenseId,
      dto.userId,
      dto.groupId,
      dto.amount,
      dto.updatedAt
    );
  }
}
