import { NextResponse } from "next/server";
import { ExpenseRepositoryImpl } from "../../Data/Repositories/ExpenseRepositoryImpl";
import { Expense } from "../../Domain/Models/Expense";
import { GetExpensesUseCase } from "../../Domain/UseCases/GetExpensesUseCase";
import { CreateExpenseUseCase, CreateExpenseParams } from "../../Domain/UseCases/CreateExpenseUseCase";
import { NoParams } from "../../Domain/UseCases/IUseCase";

export async function GET() {
  const getExpensesUseCase = new GetExpensesUseCase(ExpenseRepositoryImpl.getInstance());
  const expenses = await getExpensesUseCase.execute(new NoParams());
  return NextResponse.json(expenses, { status: 200 });
}

export async function POST(req: Request) {
  const createExpenseUseCase = new CreateExpenseUseCase(ExpenseRepositoryImpl.getInstance());
  const { id, date, description, category, amount} = await req.json();
  const newExpense = new Expense(id,date,description,category,amount);
  const createdExpense = await createExpenseUseCase.execute(new CreateExpenseParams(newExpense));
  return NextResponse.json(createdExpense, { status: 201 });
}
