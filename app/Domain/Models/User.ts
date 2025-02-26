import { UserDTO } from "@data/DTOs/UserDTO";
import { IModel } from "@domain/Models/IModel";

export class User implements IModel<UserDTO>{
  constructor(
    public id: string,
    public name?: string,
    public username?: string,
    public email?: string,
    public emailVerified?: Date,
    public image?: string,
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date()
  ) {}

  public serializeDTO(): UserDTO {
    return {...this};
  }

  public static parseDTO(dto: UserDTO): User {
    return new User(
      dto.id,
      dto.name,
      dto.username,
      dto.email,
      dto.emailVerified,
      dto.image,
      dto.createdAt,
      dto.updatedAt
    );
  }

  toString(): string {
    return JSON.stringify(this);
  }
}
