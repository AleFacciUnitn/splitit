import { ExpenseDTO } from "../../Data/DTOs/ExpenseDTO";
import { IModel } from "./IModel";

export class Expense implements IModel<ExpenseDTO> {
  constructor(
    public id: string,
    public userId: string,
    public date: string,
    public description: string,
    public category: string,
    public amount: number,
  ) {}

  public serializeDTO(): ExpenseDTO {
    return {...this};
  }

  public static parseDTO(dto: ExpenseDTO): Expense {
    return new Expense(
      dto.id,
      dto.userId,
      dto.date,
      dto.description,
      dto.category,
      dto.amount
    );
  }
}
