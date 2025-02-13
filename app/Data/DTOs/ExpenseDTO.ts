import { IDTO } from "./IDTO.ts";

export interface ExpenseDTO extends IDTO {
  id: string;
  date: string;
  description: string;
  category: string;
  amount: number;
}
