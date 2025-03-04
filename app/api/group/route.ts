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
import { CreateGroupUserUseCase, CreateGroupUserParams } from "@domain/UseCases/GroupUser/CreateGroupUserUseCase";
import { NoParams } from "@domain/UseCases/IUseCase";

const groupRepository = GroupRepositoryImpl.getInstance();
const groupUserRepository = GroupUserRepositoryImpl.getInstance()

export async function GET() {
  const headerList = await headers();
  const userId = headerList.get("userId");
  var groups;
  if( userId ) groups = await getByUserId(userId);
  else groups = await get();
  return NextResponse.json(groups, { status: 200 });
}

async function get() {
  const useCase = new GetGroupsUseCase(groupRepository);
  const items = await useCase.execute(new NoParams());
  return items;
}

async function getByUserId(userId: string) {
  var useCase = new GetGroupUsersByUserIdUseCase(groupUserRepository);
  const groupUsers: GroupUser[] = await useCase.execute(new GetGroupUsersByUserIdParams(userId));
  useCase = new GetGroupByIdUseCase(groupRepository);
  const items = groupUsers?.map(async (groupUser) => await useCase.execute(new GetGroupByIdParams(groupUser.groupId)));
  return Promise.all(items);
}

export async function POST(req: Request) {
  var useCase = new CreateGroupUseCase(groupRepository);
  const { userId, name } = await req.json();
  var newItem = new Group("1",name);
  const createdItem = await useCase.execute(new CreateGroupParams(newItem));
  newItem = new GroupUser(userId,createdItem.id);
  useCase = new CreateGroupUserUseCase(groupUserRepository);
  await useCase.execute(new CreateGroupUserParams(newItem));
  return NextResponse.json(createdItem, { status: 201 });
}
