import { Expense } from "@domain/Models/Expense";
import { IExpenseRepository } from "@domain/Repositories/IExpenseRepository";
import { ExpenseDataSourceMariaDB } from "@data/DataSources/ExpenseDataSourceMariaDB";
import { ExpenseDTO } from "@data/DTOs/ExpenseDTO";
import { RepositoryImpl } from "@data/Repositories/RepositoryImpl";

export class ExpenseRepositoryImpl extends RepositoryImpl<Expense, ExpenseDTO> implements IExpenseRepository<Expense>{
  private static instance: ExpenseRepositoryImpl;

  private constructor() {
    super(ExpenseDataSourceMariaDB.getInstance());
  }

  public static getInstance(): ExpenseRepositoryImpl {
    if (!ExpenseRepositoryImpl.instance) {
      ExpenseRepositoryImpl.instance = new ExpenseRepositoryImpl();
    }
    return ExpenseRepositoryImpl.instance;
  }

  protected mapToModel(dto: ExpenseDTO) {
    return Expense.parseDTO(dto);
  }

  async fetchByUserId(id: string): Promise<Expense[] | null> {
    return this.dataSource.fetchByUserId(id);
  }
}
