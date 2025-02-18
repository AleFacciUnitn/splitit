export interface IPartitionRepository<T> {
  fetchByExpenseId(id: string): Promise<T | null>;
  fetchByUserId(id: string): Promise<T | null>;
}
