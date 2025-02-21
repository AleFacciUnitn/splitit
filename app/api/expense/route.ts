// next
import { NextResponse } from "next/server";
import { headers } from "next/headers";

// RepositoryImpls
import { ExpenseRepositoryImpl } from "@data/Repositories/ExpenseRepositoryImpl";
import { PartitionRepositoryImpl } from "@data/Repositories/PartitionRepositoryImpl";
import { GroupUserRepositoryImpl } from "@data/Repositories/GroupUserRepositoryImpl";

// Models
import { Expense } from "@domain/Models/Expense";
import { Partition } from "@domain/Models/Partition";
import { GroupUser } from "@domain/Models/GroupUser";

// UseCases and Params
import { GetExpensesUseCase } from "@domain/UseCases/Expense/GetExpensesUseCase";
import { GetExpensesByUserIdUseCase, GetExpensesByUserIdParams } from "@domain/UseCases/Expense/GetExpensesByUserIdUseCase";
import { CreateExpenseUseCase, CreateExpenseParams } from "@domain/UseCases/Expense/CreateExpenseUseCase";
import { NoParams } from "@domain/UseCases/IUseCase";
import { CreatePartitionUseCase, CreatePartitionParams } from "@domain/UseCases/Partition/CreatePartitionUseCase";
import { GetGroupUsersByGroupIdUseCase, GetGroupUsersByGroupIdParams } from "@domain/UseCases/GroupUser/GetGroupUsersByGroupIdUseCase";

const expenseRepository = ExpenseRepositoryImpl.getInstance();
const partitionRepository = PartitionRepositoryImpl.getInstance();
const groupUserRepository = GroupUserRepositoryImpl.getInstance();

export async function GET() {
  const headerList = await headers();
  const userId = headerList.get("userId");
  if( userId ) return getExpensesByUserId(userId);
  return getExpenses();
}

async function getExpenses() {
  const getExpensesUseCase = new GetExpensesUseCase(expenseRepository);
  const expenses = await getExpensesUseCase.execute(new NoParams());
  return NextResponse.json(expenses, { status: 200 });
}

async function getExpensesByUserId(userId: string) {
  const useCase = new GetExpensesByUserIdUseCase(expenseRepository);
  const expenses = await useCase.execute(new GetExpensesByUserIdParams(userId));
  return NextResponse.json(expenses, { status: 200 });
}

export async function POST(req: Request) {
  const createExpenseUseCase = new CreateExpenseUseCase(expenseRepository);
  const { id, userId, groupId, date, description, category, amount} = await req.json();
  const newExpense = new Expense(id,userId,date,description,category,amount,groupId);
  const createdExpense = await createExpenseUseCase.execute(new CreateExpenseParams(newExpense));
  await createPartition(groupId,userId,amount,createdExpense.id);
  return NextResponse.json(createdExpense, { status: 201 });
}

async function createPartition(groupId: string | null, userId: string, amount: number, expenseId: string): void {
  if (groupId === null) return createUserPartition(groupId,userId,amount,expenseId);
  const useCase = new GetGroupUsersByGroupIdUseCase(groupUserRepository);
  const groupUsers = useCase.execute(new GetGroupUsersByGroupIdParams(groupId));
  const dividedAmount = amount/groupUsers.length;
  groupUsers.forEach((groupUser) => createUserPartition(groupId,groupUser.userId,dividedAmount,expenseId));
}

async function createUserPartition(groupId: string | null, userId: string, amount: number, expenseId: string): void {
  const useCase = new CreatePartitionUseCase(partitionRepository);
  const newItem = new Partition("1",expenseId,userId,groupId,amount);
  const createdItem = await useCase.execute(new CreatePartitionParams(newItem));
}
