import { Expense } from "../../Domain/Models/Expense";
import { ExpenseDataSourceLocal } from "../DataSources/ExpenseDataSourceLocal";
import { ExpenseDTO } from "../DTOs/ExpenseDTO";
import { RepositoryImpl } from "./RepositoryImpl";

export class ExpenseRepositoryImpl extends RepositoryImpl<Expense, ExpenseDTO> {
  private static instance: ExpenseRepositoryImpl;

  private constructor() {
    super(ExpenseDataSourceLocal.getInstance());
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
}
