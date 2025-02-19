import { PartitionDTO } from "../../Data/PartitionDTO";

export class Partition {
  constructor(
    public id: string,
    public expenseId: string,
    public userId: string,
    public groupId: string,
    public amount: number
  ) {}

  public parseDTO(): PartitionDTO {
    return {...this}
  }

  public static parseDTO(dto: PartitionDTO): Partition {
    return new Partition(
      dto.id,
      dto.expenseId,
      dto.userId,
      dto.groupId,
      dto.amount
    );
  }
}
