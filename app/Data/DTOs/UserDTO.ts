import { IDTO } from "./IDTO";

export interface ExpenseDTO extends IDTO {
  id: string;
  email: string;
  password: string;
}
