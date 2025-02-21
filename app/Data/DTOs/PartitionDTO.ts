import { IDTO } from "@data/DTOs/IDTO";

export interface PartitionDTO extends IDTO {
  id: string;
  expenseId: string;
  userId: string;
  amount: number;
  updatedAt: Date;
}
