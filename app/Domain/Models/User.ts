import { UserDTO } from "../../Data/DTOs/UserDTO";

export class User {
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
}
