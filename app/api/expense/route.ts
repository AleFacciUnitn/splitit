import { NextResponse } from "next/server";
import { ExpenseRepositoryImpl } from "../../Data/Repositories/ExpenseRepositoryImpl.ts";
import { Expense } from "../../Domain/Models/Expense.ts";
import { GetExpensesUseCase } from "../../Domain/UseCases/GetExpensesUseCase.ts";
import { CreateExpenseUseCase, CreateExpenseParams } from "../../Domain/UseCases/CreateExpenseUseCase.ts";

const expenseRepository = ExpenseRepositoryImpl.getInstance();

export async function GET() {
  const getExpensesUseCase = new GetExpensesUseCase(expenseRepository);
  const expenses = await getExpensesUseCase.execute();
  return NextResponse.json(expenses, { status: 200 });
}

export async function POST(req: Request) {
  const createExpenseUseCase = new CreateExpenseUseCase(expenseRepository);
  const { id, date, description, category, amount} = await req.json();
  const newExpense = new Expense(id,date,description,category,amount);
  const createdExpense = await createExpenseUseCase.execute(new CreateExpenseParams(newExpense));
  return NextResponse.json(createdExpense, { status: 201 });
}
