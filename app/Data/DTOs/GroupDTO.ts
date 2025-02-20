import { IDTO } from "./IDTO";

export interface GroupDTO extends IDTO {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}
