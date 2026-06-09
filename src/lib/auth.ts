import jwt, { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcryptjs";

export type AuthUserPayload = {
  id: string;
  email: string;
  role: "admin" | "customer";
};

const JWT_SECRET = process.env.JWT_SECRET;

function requireJwtSecret() {
  if (!JWT_SECRET) {
    throw new Error("Please define JWT_SECRET in environment variables.");
  }
  return JWT_SECRET;
}

export function signToken(payload: AuthUserPayload) {
  return jwt.sign(payload, requireJwtSecret(), {
    expiresIn: "7d",
  });
}

export function verifyToken(token: string) {
  return jwt.verify(token, requireJwtSecret()) as JwtPayload & AuthUserPayload;
}

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

export async function comparePassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}
