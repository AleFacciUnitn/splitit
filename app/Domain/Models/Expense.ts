import { ExpenseDTO } from "@data/DTOs/ExpenseDTO";
import { IModel } from "@domain/Models/IModel";

export class Expense implements IModel<ExpenseDTO> {
  constructor(
    public id: string,
    public userId: string,
    public date: Date,
    public description: string,
    public category: string,
    public amount: number,
    public groupId?: string,
    public updatedAt: Date = new Date()
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
      dto.amount,
      dto.groupId,
      dto.updatedAt
    );
  }
}
