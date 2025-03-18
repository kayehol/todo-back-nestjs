import { Request } from "express";

export interface JwtRequest extends Request {
  user: {
    username: string;
    sub: string;
  }
}
