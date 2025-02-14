import request from "supertest";
import { GET, POST } from "../app/api/expense/route"; // Adjust import path based on your structure
import { ExpenseRepositoryImpl } from "../app/Data/Repositories/ExpenseRepositoryImpl";
import { Expense } from "../app/Domain/Models/Expense";

// Mock the repository
jest.mock("../app/Data/Repositories/ExpenseRepositoryImpl");

describe("Expense API Routes", () => {
  let mockExpenseRepository: jest.Mocked<ExpenseRepositoryImpl>;
  let mockGetExpensesUseCase: jest.Mock;
  let mockCreateExpenseUseCase: jest.Mock;

  beforeEach(() => {
    mockExpenseRepository = Object.create(ExpenseRepositoryImpl.prototype) as jest.Mocked<ExpenseRepositoryImpl>;

    mockExpenseRepository.fetchAll = jest.fn().mockResolvedValue([
      new Expense("1", "2024-02-10", "Groceries", "Food", 100),
      new Expense("2", "2024-02-10", "Restaurant", "Food", 50),
    ]);

    mockExpenseRepository.fetchById = jest.fn();
    mockExpenseRepository.create = jest.fn().mockImplementation((expense: Expense) => Promise.resolve(expense));
    mockExpenseRepository.update = jest.fn();
    mockExpenseRepository.delete = jest.fn();

    // Ensure `getInstance()` returns the mock repository
    jest.spyOn(ExpenseRepositoryImpl, "getInstance").mockReturnValue(mockExpenseRepository);

    mockGetExpensesUseCase = jest.fn().mockImplementation(() => ({
      execute: jest.fn().mockResolvedValue([
        new Expense("1", "2024-02-10", "Groceries", "Food", 100),
      ]),
    }));

    mockCreateExpenseUseCase = jest.fn().mockImplementation(() => ({
      execute: jest.fn().mockImplementation((params) => Promise.resolve(params.expense)),
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("GET /api/expenses should return all expenses", async () => {
    const response = await GET();
    const json = await response.json();

    expect(mockExpenseRepository.fetchAll).toHaveBeenCalled();
    expect(response.status).toBe(200);
    expect(json).toHaveLength(2);
    expect(json[0].description).toBe("Groceries");
  });

  test("POST /api/expenses should create a new expense", async () => {
    const newExpense = {
      id: "2",
      date: "2024-02-11",
      description: "Gas",
      category: "Transport",
      amount: 50,
    };

    const req = new Request("http://localhost/api/expenses", {
      method: "POST",
      body: JSON.stringify(newExpense),
    });

    const response = await POST(req);
    const json = await response.json();

    expect(mockExpenseRepository.create).toHaveBeenCalled();
    expect(response.status).toBe(201);
    expect(json.id).toBe("2");
    expect(json.description).toBe("Gas");
  });
});

