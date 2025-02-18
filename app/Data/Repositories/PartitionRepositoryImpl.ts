import { IPartitionRepository } from "../../Domain/Repositories/IPartitionRepository";
import { Partition } from "../../Domain/Models/Partition";
import { BaseRepository } from "./RepositoryImpl";
import { PartitionDataSourceLocal } from "../DataSources/PatitionDataSourceLocal";
import { PartitionDTO } from "../DTOs/PartitionDTO";

export class PartitionRepositoryImpl extends RepositoryImpl<Partition, PartitionDTO> implements IPartitionRepository<Partition> {
  private static instance: PartitionRepositoryImpl;

  private constructor() {
    super(PartitionDataSourceLocal.getInstance());
  }

  public static getInstance(): PartitionRepositoryImpl {
    if (!PartitionRepositoryImpl.instance) {
      PartitionRepositoryImpl.instance = new PartitionRepositoryImpl();
    }
    return PartitionRepositoryImpl.instance;
  }

  protected mapToModel(dto: PartitionDTO) {
    return Partition.parseDTO(dto);
  }

  async fetchByExpenseId(id: string): Promise<Partition[] | null> {
    try {
      const dtos = await this.dataSource.fetchByExpenseId(id);
      return dtos.map((dto: PartitionDTO) => Partition.parseDTO(dto));
    } catch (e) {
      return null;
    }
  }

  async fetchByUserId(id: string): Promise<Partition[] | null> {
    try {
      const dtos = await this.dataSource.fetchByUserId(id);
      return dtos.map((dto: PartitionDTO) => Partition.parseDTO(dto));
    } catch (e) {
      return null;
    }
  }
}
