export interface IUserRepository<T> {
  logIn(email: string, password: string): Promise<T>;
}
