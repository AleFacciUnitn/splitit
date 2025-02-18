import { IDTO } from "./IDTO";

export interface PartitionDTO extends IDTO {
  id: string,
  expenseId: string,
  userId: string,
  amount: number
}
