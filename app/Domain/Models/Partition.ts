import { PartitionDTO } from "@data/PartitionDTO";
import { IModel } from "@domain/Models/IModel";

export class Partition implements IModel {
  constructor(
    public id: string,
    public expenseId: string,
    public userId: string,
    public amount: number,
    public updatedAt: Date,
  ) {}

  public parseDTO(): PartitionDTO {
    return {...this}
  }

  public static parseDTO(dto: PartitionDTO): Partition {
    return new Partition(
      dto.id,
      dto.expenseId,
      dto.userId,
      dto.amount,
      dto.updatedAt
    );
  }
}
