export interface IUseCase<IParams,T> {
  async execute(params): Promise<T>;
}

export interface IParams {}

export class NoParams implements IParams {}
