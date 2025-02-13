import { NextResponse } from "next/server";
import { ExpenseRepositoryImpl } from "../../../Data/Repositories/ExpenseRepositoryImpl.ts";
import { Expense } from "../../Domain/Models/Expense.ts";
import { GetExpenseByIdUseCase, GetExpenseByIdParams } from "../../../Domain/UseCases/GetExpenseByIdUseCase.ts";
import { UpdateExpenseUseCase, UpdateExpenseParams } from "../../../Domain/UseCases/UpdateExpenseUseCase.ts";
import { DeleteExpenseUseCase, DeleteExpenseParams } from "../../../Domain/UseCases/DeleteExpenseUseCase.ts";

const expenseRepository = ExpenseRepositoryImpl.getInstance();

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = await params;
  const getExpenseByIdUseCase = new GetExpenseByIdUseCase(expenseRepository);
  const expense = await getExpenseByIdUseCase.execute(new GetExpenseByIdParams(id));
  return NextResponse.json(expense, { status: 200 });
}

export async function Put(req: Request, { params }: { params: { id: string } }) {
  const { id } = await params;
  const item = await req.json();
  const updateExpenseUseCase = new UpdateExpenseUseCase(expenseRepository);
  const expense = await updateExpenseUseCase.execute(new UpdateExpenseParams(id,item));
  return NextResponse.json(expense, { status: 200 });
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const { id } = await params;
  const deleteExpenseUseCase = new DeleteExpenseUseCase(expenseRepository);
  const expense = await deleteExpenseUseCase.execute(new DeleteExpenseParams(id));
  return NextResponse.json(expense, { status: 200 });
}
