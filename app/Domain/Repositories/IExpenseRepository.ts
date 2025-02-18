export interface IPartitionRepository<T> {
  fetchByUserId(id: string): Promise<T[] | null>;
}
