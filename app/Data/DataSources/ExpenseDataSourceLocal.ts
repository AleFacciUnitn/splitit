import { ExpenseDTO } from "../DTOs/ExpenseDTO.ts";
import { IDataSource } from "./IDataSource.ts";

export class ExpenseDataSourceLocal implements IDataSource<ExpenseDTO>{
  private static instance: ExpenseDataSourceLocal;
  private expenses: ExpenseDTO[];

  private constructor() {
    this.expenses = [];
  }

  public static getInstance(): ExpenseDataSourceLocal {
    if (!ExpenseDataSourceLocal.instance) {
      ExpenseDataSourceLocal.instance = new ExpenseDataSourceLocal();
    }
    return ExpenseDataSourceLocal.instance;
  }

  async fetchAll(): Promise<ExpenseDTO[]> {
    return this.expenses;
  }

  async fetchById(id: string): Promise<ExpenseDTO | null> {
    return this.expenses.find(expense => expense.id === id);
  }

  async create(item: ExpenseDTO): Promise<ExpenseDTO> {
    this.expenses.push(item);
    return item;
  }

  async update(id: string, item: Partial<ExpenseDTO>): Promise<ExpenseDTO> {
    const index = this.expenses.findIndex(expense => expense.id === id);
    if (index === -1) throw "User not found";
    this.expenses[index] = {...this.expenses[index], ...item};
    return this.expenses[index];
  }

  async delete(id: string): Promise<boolean> {
    const index = this.expenses.findIndex(expense => expense.id === id);
    if (index === -1) return false;
    this.expenses.splice(index,1);
    return true;
  }
}
