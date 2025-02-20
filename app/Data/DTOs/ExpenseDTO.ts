import { IDTO } from "./IDTO";

export interface ExpenseDTO extends IDTO {
  id: string;
  userId: string;
  date: Date;
  description: string;
  category: string;
  amount: number;
  groupId?: string;
  updatedAt: Date;
}
