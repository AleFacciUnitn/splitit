import { ExpenseRepositoryImpl } from "../app/Data/Repositories/ExpenseRepositoryImpl";
import { ExpenseDataSourceLocal } from "../app/Data/DataSources/ExpenseDataSourceLocal";
import { Expense } from "../app/Domain/Models/Expense";


describe("ExpenseRepositoryImpl", () => {
  let expenseRepository: ExpenseRepositoryImpl;
  let expenseDataSource: ExpenseDataSourceLocal;
  let expense: Expense = new Expense("1","yyyy-mm-dd","expense","Groceries",100);


  beforeEach(() => {
    expenseDataSource = ExpenseDataSourceLocal.getInstance();
    (expenseDataSource as any).expenses = [expense.serializeDTO()]; // Reset internal state before each test
    expenseRepository = ExpenseRepositoryImpl.getInstance();
  });

  test("Should be a singleton", () => {
    const instance1 = ExpenseRepositoryImpl.getInstance();
    const instance2 = ExpenseRepositoryImpl.getInstance();
    expect(instance1).toBe(instance2);
  });

  test("should add an expense", async () => {
    const newExpense: Expense = new Expense("0","yyyy-mm-dd","expense","Groceries",100);
    await expenseRepository.create(newExpense);

    expect((expenseDataSource as any).expenses.length).toBe(2);
    expect((expenseDataSource as any).expenses[1]).toEqual(newExpense);
  });

  test("should retrieve all expenses", async () => {
    const expenses = await expenseRepository.fetchAll();
    expect(expenses).toEqual((expenseDataSource as any).expenses);
  });

  test("should retrieve an expense by ID", async () => {
    const retrievedExpense = await expenseRepository.fetchById("1");
    expect(retrievedExpense).toEqual(expense);
  });

  test("should return null when updating a non-existent expense", async () => {
    const retrievedExpense = await expenseRepository.update("99",{ category: "none" });
    expect(retrievedExpense).toBe(null);
  });

  test("should return null when fetching a non-existent expense", async () => {
    const retrievedExpense = await expenseRepository.fetchById("99");
    expect(retrievedExpense).toBe(null);
  });

  test("should delete an expense by ID", async () => {
    const deleted = await expenseRepository.delete("1");
    expect(deleted).toBe(true);
    expect((expenseDataSource as any).expenses.length).toBe(0);
  });

  test("should return false when deleting a non-existent expense", async () => {
    const deleted = await expenseRepository.delete("99");
    expect(deleted).toBe(false);
  });
});
