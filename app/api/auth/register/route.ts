// next
import { NextResponse } from "next/server";

// RepositoryImpl
import { UserRepositoryNextAuthImpl } from "@data/Repositories/UserRepositoryNextAuthImpl";

// Model
import { User } from "@domain/Models/User";

// UseCase and Params
import { CreateUserUseCase, CreateUserParams } from "@domain/UseCases/User/CreateUserUseCase";

export async function POST(req: Request) {
  const repository: UserRepositoryNextAuthImpl = UserRepositoryNextAuthImpl.getInstance();
  const { email, password } = await req.json();
  const useCase: CreateUserUseCase = new CreateUserUseCase(repository);
  const newUser = new User("uuuuuuuuuuid", email, password);
  const user = await useCase.execute(new CreateUserParams(newUser));
  return NextResponse.json(user, { status: 201 });
}
