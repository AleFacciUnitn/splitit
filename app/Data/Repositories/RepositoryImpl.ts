import { IDataSource } from "@data/DataSources/IDataSource";
import { IModel } from "@domain/Models/IModel";

export abstract class RepositoryImpl<TModel, TDTO> {
  private dataSource: IDataSource<TDTO>;

  protected constructor(aDataSource: IDataSource<TDTO>){
    this.dataSource = aDataSource;
  }

  protected abstract mapToModel(dto: TDTO): TModel;

  async fetchAll(): Promise<TModel[]> {
    const dtos = await this.dataSource.fetchAll();
    return dtos.map((dto) => this.mapToModel(dto));
  }

  async fetchById(id: string): Promise<TModel | null> {
    try {
      const dto = await this.dataSource.fetchById(id);
      return this.mapToModel(dto);
    } catch (e) {
      return null;
    }
  }

  async create(model: TModel): Promise<TModel> {
    console.log(model);
    const dto = (model as unknown as IModel<TDTO>).serializeDTO();
    const createdDto = await this.dataSource.create(dto);
    return this.mapToModel(createdDto);
  }

  async update(id: string, model: Partial<TModel>): Promise<TModel | null> {
    try {
      const dto = (model as unknown as IModel<TDTO>).serializeDTO();
      const updatedDto = await this.dataSource.update(id, dto);
      return this.mapToModel(updatedDto);
    } catch (e) {
      return null;
    }
  }

  async delete(id: string): Promise<TModel | null> {
    try {
      return this.dataSource.delete(id);
    } catch (e) {
      return null;
    }
  }
}

