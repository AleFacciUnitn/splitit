import jwt from "jsonwebtoken";
import * as jose from "jose"
import bcrypt from "bcryptjs";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "SECRET_KEY");

export class AuthServices {
  private static instance: AuthServices;

  private constructor() {} // Private constructor (Singleton)

  public static getInstance(): AuthServices {
    if (!AuthServices.instance) {
      AuthServices.instance = new AuthServices();
    }
    return AuthServices.instance;
  }

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }

  async comparePasswords(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }

  generateToken(id: string, expirationTime: string): string {
    return jwt.sign({ id }, JWT_SECRET, { expiresIn: expirationTime });
  }

  verifyToken(token: string): void {
    jose.jwtVerify(token, JWT_SECRET);
  }
} 
