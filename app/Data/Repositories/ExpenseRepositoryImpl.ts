import { IExpenseRepository } from "../../Domain/Repositories/IExpenseRepository.ts";
import { Expense } from "../../Domain/Models/Expense.ts";
import { ExpenseDataSourceLocal } from "../DataSources/ExpenseDataSourceLocal.ts";
import { ExpenseDTO } from "../DTOs/ExpenseDTO.ts";

export class ExpenseRepositoryImpl<ExpenseDataSourceLocal> implements IExpenseRepository {
  private static instance: ExpenseRepositoryImpl;
  private dataSource: IDataSource;

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
    const dto = await this.dataSource.fetchById(id);
    return dto ? Expense.parseExpenseDTO(dto) : null;
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
    } catch (error) {
      return null;
    }
  }

  async delete(id: string): Promise<boolean> {
    return ExpenseDataSourceLocal.delete(id);
  }
}
