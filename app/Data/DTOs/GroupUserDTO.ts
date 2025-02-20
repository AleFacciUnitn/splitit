import { IDTO } from "./IDTO";

export interface GroupDTO extends IDTO {
  userId: string;
  groupId: string;
}
