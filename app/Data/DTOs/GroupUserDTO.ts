import { IDTO } from "@data/DTOs/IDTO";

export interface GroupUserDTO extends IDTO {
  userId: string;
  groupId: string;
}
