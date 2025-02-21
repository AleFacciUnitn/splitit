import { IRepository } from "@domain/Repositories/IRepository";
import { Partition } from "@domain/Models/Partition";
import { IUseCase, IParams } from "@domain/UseCases/IUseCase";

export class CreatePartitionUseCase implements IUseCase<CreatePartitionParams,Partition> {
  constructor(private repository: IRepository<Partition>) {}

  async execute(params: CreatePartitionParams): Promise<Partition> {
    return await this.repository.create(params.item);
  }
}

export class CreatePartitionParams implements IParams {
  constructor(public item: Partition) {}
}
