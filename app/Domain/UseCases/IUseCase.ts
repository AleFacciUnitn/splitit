export interface IUseCase<IParams,T> {
  execute(params: IParams): Promise<T>;
}

export interface IParams {}

export class NoParams implements IParams {}
