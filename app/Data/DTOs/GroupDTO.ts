import { IDTO } from "@data/DTOs/IDTO";

export interface GroupDTO extends IDTO {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}
