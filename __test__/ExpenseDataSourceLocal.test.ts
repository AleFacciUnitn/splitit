import { ExpenseDataSourceLocal } from "../app/Data/DataSources/ExpenseDataSourceLocal";
import { ExpenseDTO } from "../app/Data/DTOs/ExpenseDTO";
import { ExpenseNotFoundError } from "../app/Core/Error/ExpenseNotFoundError";

describe("ExpenseDataSourceLocal", () => {
  let expenseDataSource: ExpenseDataSourceLocal;

  beforeEach(() => {
    expenseDataSource = ExpenseDataSourceLocal.getInstance();
    (expenseDataSource as any).expenses = []; // Reset internal state before each test
  });

  test("should be a singleton", () => {
    const instance1 = ExpenseDataSourceLocal.getInstance();
    const instance2 = ExpenseDataSourceLocal.getInstance();
    expect(instance1).toBe(instance2); // Both instances should be the same
  });

  test("should add an expense", async () => {
    const expense: ExpenseDTO = { id: "1", date: "yyyy-mm-dd", category: "expense", amount: 100, description: "Groceries" };
    await expenseDataSource.create(expense);

    expect((expenseDataSource as any).expenses.length).toBe(1);
    expect((expenseDataSource as any).expenses[0]).toEqual(expense);
  });

  test("should retrieve all expenses", async () => {
    const expense1: ExpenseDTO = { id: "1", date: "yyyy-mm-dd", category: "expense", amount: 100, description: "Groceries" };
    const expense2: ExpenseDTO = { id: "2", date: "yyyy-mm-dd", category: "expense", amount: 50, description: "Transport" };

    await expenseDataSource.create(expense1);
    await expenseDataSource.create(expense2);

    const expenses = await expenseDataSource.fetchAll();
    expect(expenses).toHaveLength(2);
    expect(expenses).toContainEqual(expense1);
    expect(expenses).toContainEqual(expense2);
  });

  test("should retrieve an expense by ID", async () => {
    const expense: ExpenseDTO = { id: "1", date: "yyyy-mm-dd", category: "expense", amount: 100, description: "Groceries" };
    await expenseDataSource.create(expense);

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
    const expense: ExpenseDTO = { id: "1", date: "yyyy-mm-dd", category: "expense", amount: 100, description: "Groceries" };
    await expenseDataSource.create(expense);

    const deleted = await expenseDataSource.delete("1");
    expect(deleted).toBe(true);
    expect((expenseDataSource as any).expenses.length).toBe(0);
  });

  test("should return false when deleting a non-existent expense", async () => {
    const deleted = await expenseDataSource.delete("99");
    expect(deleted).toBe(false);
  });
});
