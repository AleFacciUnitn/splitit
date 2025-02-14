import { ExpenseDTO } from "../DTOs/ExpenseDTO";
import { IDataSource } from "./IDataSource";
import { ExpenseNotFoundError } from "../../Core/Error/ExpenseNotFoundError";

export class ExpenseDataSourceLocal implements IDataSource<ExpenseDTO>{
  private static instance: ExpenseDataSourceLocal;
  private id: number = 0;
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

  async fetchById(id: string): Promise<ExpenseDTO> {
    const expense = this.expenses.find(expense => expense.id === id);
    if (!expense) throw new ExpenseNotFoundError();
    return expense;
  }

  async create(item: ExpenseDTO): Promise<ExpenseDTO> {
    item.id = `${this.id++}`;
    this.expenses.push(item);
    return item;
  }

  async update(id: string, item: Partial<ExpenseDTO>): Promise<ExpenseDTO> {
    const index = this.expenses.findIndex(expense => expense.id === id);
    if (index === -1) throw new ExpenseNotFoundError();
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
