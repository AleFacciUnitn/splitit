import { NextResponse } from "next/server";
import { UserRepositoryNextAuthImpl } from "../../../Data/Repositories/UserRepositoryNextAuthImpl";
import { CreateUserUseCase, CreateUserParams } from "../../../Domain/UseCases/CreateUserUseCase";
import { User } from "../../../Domain/Models/User";

export async function POST(req: Request) {
  const repository: UserRepositoryNextAuthImpl = UserRepositoryNextAuthImpl.getInstance();
  const { email, password } = await req.json();

  const useCase: CreateUserUseCase = new CreateUserUseCase(repository);
  const newUser = new User("", email, password);
  const user = await useCase.execute(new CreateUserParams(newUser));
  return NextResponse.json(user, { status: 201 });
}
