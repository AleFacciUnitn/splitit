import { ExpenseDataSourceLocal } from "../app/Data/DataSources/ExpenseDataSourceLocal";
import { ExpenseDTO } from "../app/Data/DTOs/ExpenseDTO";
import { ExpenseNotFoundError } from "../app/Core/Error/ExpenseNotFoundError";

describe("ExpenseDataSourceLocal", () => {
  let expenseDataSource: ExpenseDataSourceLocal;
  let expense: ExpenseDTO;

  beforeEach(() => {
    expenseDataSource = ExpenseDataSourceLocal.getInstance();
    expense = { id: "1", date: "yyyy-mm-dd", category: "expense", amount: 100, description: "Groceries" };
    (expenseDataSource as any).expenses = [ expense ]; // Reset internal state before each test
  });

  test("should be a singleton", () => {
    const instance1 = ExpenseDataSourceLocal.getInstance();
    const instance2 = ExpenseDataSourceLocal.getInstance();
    expect(instance1).toBe(instance2); // Both instances should be the same
  });

  test("should add an expense", async () => {
    const newExpense: ExpenseDTO = { id: "2", date: "yyyy-mm-dd", category: "expense", amount: 100, description: "Groceries" };
    await expenseDataSource.create(newExpense);

    expect((expenseDataSource as any).expenses).toHaveLength(2);
    expect((expenseDataSource as any).expenses[1]).toEqual(newExpense);
  });

  test("should retrieve all expenses", async () => {
    let expensesFetched = await expenseDataSource.fetchAll();
    expect(expensesFetched).toBe((expenseDataSource as any).expenses);
  });

  test("should retrieve an expense by ID", async () => {
    const retrievedExpense = await expenseDataSource.fetchById("1");
    expect(retrievedExpense).toEqual(expense);
  });

  test("should rejects the promise when updating a non-existent expense", () => {
    const retrievedExpense = () => expenseDataSource.update("99",{ category: "none" });
    expect(retrievedExpense).rejects.toThrow(ExpenseNotFoundError);
  });

  test("should rejects the promise when fetching a non-existent expense", () => {
    const retrievedExpense = () => expenseDataSource.fetchById("99");
    expect(retrievedExpense).rejects.toThrow(ExpenseNotFoundError);
  });

  test("should delete an expense by ID", async () => {
    const deleted = await expenseDataSource.delete("1");
    expect(deleted).toBe(true);
    expect((expenseDataSource as any).expenses).toHaveLength(0);
  });

  test("should return false when deleting a non-existent expense", async () => {
    const deleted = await expenseDataSource.delete("99");
    expect(deleted).toBe(false);
  });
});
