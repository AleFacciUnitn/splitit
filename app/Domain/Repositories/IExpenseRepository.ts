import { Expense } from "../Models/Expense.ts";
import { IRepository } from "./IRepository.ts";

export interface IExpenseRepository extends IRepository<Expense>{
  create(item: Expense): Promise<Expense>;
  fetchAll(): Promise<Expense[]>;
  fetchById(id: string): Promise<Expense | null>;
  update(id: string, item: Partial<Expense>): Promise<Expense | null>;
  delete(id: string): Promise<boolean>;
}
