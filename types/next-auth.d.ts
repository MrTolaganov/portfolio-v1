import { DefaultSession } from "next-auth";
import { IUser } from "@/types/index";

declare module "next-auth" {
  interface Session {
    user: {} & DefaultSession["user"];
    currentUser?: IUser;
  }
}
