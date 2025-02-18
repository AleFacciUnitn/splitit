import { IDataSource } from "../DataSources/IDataSource";
import { IModel } from "../../Domain/Models/IModel";

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

  async delete(id: string): Promise<boolean> {
    return this.dataSource.delete(id);
  }
}

