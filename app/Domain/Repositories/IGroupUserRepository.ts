export interface IGroupUserRepository<T> {
  fetchByUserId(id: string): Promise<T[] | null>;
}
