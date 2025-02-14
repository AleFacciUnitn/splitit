import { NextResponse } from "next/server";
import { ExpenseRepositoryImpl } from "../../../Data/Repositories/ExpenseRepositoryImpl.ts";
import { Expense } from "../../Domain/Models/Expense.ts";
import { GetExpenseByIdUseCase, GetExpenseByIdParams } from "../../../Domain/UseCases/GetExpenseByIdUseCase.ts";
import { UpdateExpenseUseCase, UpdateExpenseParams } from "../../../Domain/UseCases/UpdateExpenseUseCase.ts";
import { DeleteExpenseUseCase, DeleteExpenseParams } from "../../../Domain/UseCases/DeleteExpenseUseCase.ts";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = await params;
  const getExpenseByIdUseCase = new GetExpenseByIdUseCase(ExpenseRepositoryImpl.getInstance());
  const expense = await getExpenseByIdUseCase.execute(new GetExpenseByIdParams(id));
  if (expense === null ) return NextResponse.json(expense, { status: 400 }); 
  return NextResponse.json(expense, { status: 200 });
}

export async function Put(req: Request, { params }: { params: { id: string } }) {
  const { id } = await params;
  const item = await req.json();
  const updateExpenseUseCase = new UpdateExpenseUseCase(ExpenseRepositoryImpl.getInstance());
  const expense = await updateExpenseUseCase.execute(new UpdateExpenseParams(id,item));
  if ( expense === null ) return NextResponse.json(expense, { status: 400 }); 
  return NextResponse.json(expense, { status: 200 })
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const { id } = await params;
  const deleteExpenseUseCase = new DeleteExpenseUseCase(ExpenseRepositoryImpl.getInstance());
  const succeded = await deleteExpenseUseCase.execute(new DeleteExpenseParams(id));
  if (!succeded) return NextResponse.json(succeded, { status: 400 })
  return NextResponse.json(expense, { status: 200 });
}
