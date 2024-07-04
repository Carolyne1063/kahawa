import { Request } from "express"
import jwt, { JwtPayload } from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config();

export const getIdFromToken = (req: Request): string => {
  try {

    const token: string | undefined = req.headers["authorization"];
    if (!token) {
      return "";
    }
    const result: string | JwtPayload = jwt.verify(token, process.env.JWT_SECRET as string);
    if (typeof result === "string") {
      return result;
    } else if (result['userId'] && typeof result['userId'] === "string") {
      return result['userId'];
    } else {
      return "";
    }
  } catch {
    return ""
  }
}