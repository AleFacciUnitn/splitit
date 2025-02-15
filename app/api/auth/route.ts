import { NextResponse } from "next/server";
import { UserRepositoryImpl } from "../../Data/Repositories/UserRepositoryImpl";
import { IUseCase, IParams } from "../../Domain/UseCases/IUseCase";
import { LogInUseCase, LogInParams } from "../../Domain/UseCases/LoginUseCase";
import { CreateUserUseCase, CreateUserParams } from "../../Domain/UseCases/CreateUserUseCase";
import { User } from "../../Domain/Models/User";

export async function POST(req: Request) {
  const repository = UserRepositoryImpl.getInstance();
  const { email, password, action } = await req.json();
  let useCase: IUseCase<IParams,any>;

  if (action === "login") {
    useCase = new LogInUseCase(repository);
    try {
      const { accessToken, refreshToken } = await useCase.execute(new LogInParams(email, password));
      const response = NextResponse.json({ token }, { status: 200 });
      response.cookies.set("accessToken", accessToken, {
	httpOnly: true,
	sameSite: "strict",
	maxAge: 60 * 60
      });
      response.cookies.set("refreshToken", refreshToken, {
	httpOnly: true,
	sameSite: "strict",
	maxAge: 7 * 24 * 60 * 60
      });
      return response;
    } catch (error) {
      console.log(error);
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }
  } else if (action === "register") {
    useCase = new CreateUserUseCase(repository);
    const newUser = new User("", email, password);
    const user = await useCase.execute(new CreateUserParams(newUser));
    return NextResponse.json(user, { status: 201 });
  } else {
    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  }
}

