import { env } from "../env";

export const authConfig = {
  jwt:{
    secret: env.NODE_SECRETS || "default",
    expiresIn: "1d"
  }
}