import { Expense } from "../../Domain/Models/Expense";
import { IExpenseRepository } from "../../Domain/Repositories/IExpenseRepository";
import { ExpenseDataSourceMariaDB } from "../DataSources/ExpenseDataSourceMariaDB";
import { ExpenseDTO } from "../DTOs/ExpenseDTO";
import { RepositoryImpl } from "./RepositoryImpl";

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
