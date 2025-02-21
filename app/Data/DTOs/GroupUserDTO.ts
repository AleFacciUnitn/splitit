import { IDTO } from "@data/DTOs/IDTO";

export interface GroupDTO extends IDTO {
  userId: string;
  groupId: string;
}
