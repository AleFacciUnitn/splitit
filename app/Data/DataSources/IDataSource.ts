import { IDTO } from "../DTOs/IDTO";

export interface IDataSource<IDTO> {
  static async fetchAll(): Promise<IDTO[]>;

  static async fetchById(id: string): Promise<IDTO>;

  static async create(item: IDTO): Promise<IDTO>;

  static async update(id: string, item: Partial<IDTO>): Promise<IDTO>;

  static async delete(id: string): Promise<boolean>;
}
