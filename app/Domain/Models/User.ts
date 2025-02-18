import { UserDTO } from "../../Data/DTOs/UserDTO";

export class User {
  constructor(
    public id: string | null,
    public email: string,
    public password: string,
  ) {}

  public serializeDTO(): UserDTO {
    return {...this};
  }

  public static parseDTO(dto: UserDTO): User {
    return new User(
      dto.id,
      dto.email,
      dto.password,
    );
  }
}
