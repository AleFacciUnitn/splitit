import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { ExpenseRepositoryImpl } from "../../Data/Repositories/ExpenseRepositoryImpl";
import { Expense } from "../../Domain/Models/Expense";
import { GetExpensesUseCase } from "../../Domain/UseCases/GetExpensesUseCase";
import { GetExpensesByUserIdUseCase, GetExpensesByUserIdParams } from "../../Domain/UseCases/GetExpensesByUserIdUseCase";
import { CreateExpenseUseCase, CreateExpenseParams } from "../../Domain/UseCases/CreateExpenseUseCase";
import { NoParams } from "../../Domain/UseCases/IUseCase";

export async function GET() {
  const headerList = await headers();
  const userId = headerList.get("userId");
  var expenses;
  if( userId ) expenses = await getExpensesByUserId(userId);
  else expenses = await getExpenses();
  return NextResponse.json(expenses, { status: 200 });
}

async function getExpenses() {
  const getExpensesUseCase = new GetExpensesUseCase(ExpenseRepositoryImpl.getInstance());
  const expenses = await getExpensesUseCase.execute(new NoParams());
  return expenses;
}

async function getExpensesByUserId(userId: string) {
  const useCase = new GetExpensesByUserIdUseCase(ExpenseRepositoryImpl.getInstance());
  const expenses = await useCase.execute(new GetExpensesByUserIdParams(userId));
  return expenses;
}

export async function POST(req: Request) {
  const createExpenseUseCase = new CreateExpenseUseCase(ExpenseRepositoryImpl.getInstance());
  const { id, userId, date, description, category, amount} = await req.json();
  const newExpense = new Expense(id,userId,date,description,category,amount);
  const createdExpense = await createExpenseUseCase.execute(new CreateExpenseParams(newExpense));
  return NextResponse.json(createdExpense, { status: 201 });
}
