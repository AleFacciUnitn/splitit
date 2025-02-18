export interface IRepository<T> {
  fetchAll(): Promise<T[]>;
  fetchById(id: string): Promise<T | null>;
  create(items: T): Promise<T>;
  update(id: string, item: Partial<T>): Promise<T | null>;
  delete(id: string): Promise<T | null>;
}
