export class ExpenseNotFoundError extends Error {
  constructor() {
    super("Expense not found");

    Object.setPrototypeOf(this, ExpenseNotFoundError.prototype);
  }
}
