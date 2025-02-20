import { IDTO } from "./IDTO";

export interface ExpenseDTO extends IDTO {
  id: string;
  name?: string;
  username?: string;
  email?: string;
  emailVerified?: Date;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}
