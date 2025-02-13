import { ExpenseDTO } from "../../Data/DTOs/ExpenseDTO.ts";

export class Expense {
  constructor(
    public id: string,
    public date: string,
    public description: string,
    public category: string,
    public amount: number,
  ) {}

  public serializeDTO(): ExpenseDTO {
    return {...this};
  }

  public static parseExpenseDTO(dto: ExpenseDTO): Expense {
    return new Expense(
      dto.id,
      dto.date,
      dto.description,
      dto.category,
      dto.amount
    );
  }
}
