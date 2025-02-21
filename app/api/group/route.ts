// next
import { NextResponse } from "next/server";
import { headers } from "next/headers";

// RepositoryImpl
import { GroupUserRepositoryImpl } from "@data/Repositories/GroupUserRepositoryImpl";
import { GroupRepositoryImpl } from "@data/Repositories/GroupRepositoryImpl";

// Model
import { GroupUser } from "@domain/Models/GroupUser";
import { Group } from "@domain/Models/Group";

// UseCases and Params
import { GetGroupsUseCase } from "@domain/UseCases/Group/GetGroupsUseCase";
import { GetGroupByIdUseCase, GetGroupByIdParams } from "@domain/UseCases/Group/GetGroupByIdUseCase";
import { GetGroupUsersByUserIdUseCase, GetGroupUsersByUserIdParams } from "@domain/UseCases/GroupUser/GetGroupUsersByUserIdUseCase";
import { CreateGroupUseCase, CreateGroupParams } from "@domain/UseCases/Group/CreateGroupUseCase";
import { NoParams } from "@domain/UseCases/IUseCase";

export async function GET() {
  const headerList = await headers();
  const userId = headerList.get("userId");
  var groups;
  if( userId ) groups = await getByUserId(userId);
  else groups = await get();
  return NextResponse.json(groups, { status: 200 });
}

async function get() {
  const useCase = new GetGroupsUseCase(GroupRepositoryImpl.getInstance());
  const items = await useCase.execute(new NoParams());
  return items;
}

async function getByUserId(userId: string) {
  var useCase = new GetGroupUsersByUserIdUseCase(GroupUserRepositoryImpl.getInstance());
  const groupUsers: GroupUser[] = await useCase.execute(new GetGroupUsersByUserIdParams(userId));
  useCase = new GetGroupByIdUseCase(GroupRepositoryImpl.getInstance());
  const items = groupUsers?.map((groupUser) => useCase.execute(new GetGroupByIdParams(groupUser.groupId)));
  return items;
}

export async function POST(req: Request) {
  const useCase = new CreateGroupUseCase(GroupRepositoryImpl.getInstance());
  const { id, name } = await req.json();
  const newItem = new Group(id,name);
  const createdItem = await useCase.execute(new CreateGroupParams(newItem));
  return NextResponse.json(createdItem, { status: 201 });
}
