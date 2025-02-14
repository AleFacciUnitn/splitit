import { IExpenseRepository } from "../../Domain/Repositories/IExpenseRepository";
import { Expense } from "../../Domain/Models/Expense";
import { IDataSource } from "../DataSources/IDataSource";
import { ExpenseDataSourceLocal } from "../DataSources/ExpenseDataSourceLocal";
import { ExpenseDTO } from "../DTOs/ExpenseDTO";

export class ExpenseRepositoryImpl implements IExpenseRepository {
  private static instance: ExpenseRepositoryImpl;
  private dataSource: IDataSource<ExpenseDTO>;

  private constructor() {
    this.dataSource = ExpenseDataSourceLocal.getInstance();
  }

  public static getInstance(): ExpenseRepositoryImpl {
    if (!ExpenseRepositoryImpl.instance) {
      ExpenseRepositoryImpl.instance = new ExpenseRepositoryImpl();
    }
    return ExpenseRepositoryImpl.instance;
  }

  async fetchAll(): Promise<Expense[]> {
    const expenseDTOs = await this.dataSource.fetchAll();
    return expenseDTOs.map((dto: ExpenseDTO) => Expense.parseExpenseDTO(dto));
  }

  async fetchById(id: string): Promise<Expense | null> {
    try {
      const dto = await this.dataSource.fetchById(id);
      return Expense.parseExpenseDTO(dto);
    } catch (e) {
      return null;
    }
  }

  async create(item: Expense): Promise<Expense> {
    const dto: ExpenseDTO = item.serializeDTO();
    const newExpense = await this.dataSource.create(dto);
    return Expense.parseExpenseDTO(newExpense);
  }

  async update(id: string, item: Partial<Expense>): Promise<Expense | null> {
    try {
      const updatedDTO = await this.dataSource.update(id,item);
      return Expense.parseExpenseDTO(updatedDTO);
    } catch (e) {
      return null;
    }
  }

  async delete(id: string): Promise<boolean> {
    return this.dataSource.delete(id);
  }
}
