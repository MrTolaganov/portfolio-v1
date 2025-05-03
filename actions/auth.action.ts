"use server";

import { IResponse, IUser } from "@/types";
import connectDatabase from "@/lib/mongoose";
import UserModel from "@/models/user.model";
import bcryptjs from "bcryptjs";

export async function getUserByEmail(email?: string): Promise<IUser | null> {
  try {
    await connectDatabase();
    const user = await UserModel.findOne({ email: email }).select("-password");
    return JSON.parse(JSON.stringify(user));
  } catch (e) {
    console.error(`Error getting user by email: ${e}`);
    return null;
  }
}

export async function createUser(
  fullName: string,
  email: string,
): Promise<IUser> {
  try {
    await connectDatabase();
    return (await UserModel.create({ fullName, email })) as IUser;
  } catch (e) {
    console.error(`Error creating user with email: ${e}`);
    return {} as IUser;
  }
}

export async function signIn(
  email: string,
  password: string,
): Promise<IResponse> {
  try {
    await connectDatabase();
    const existedUser = await UserModel.findOne({ email });

    if (!existedUser)
      return {
        status: 400,
        message: "You have not signed up yet. Please sign up first",
      };

    const correctPassword = await bcryptjs.compare(
      password,
      existedUser.password,
    );

    if (!correctPassword) return { status: 401, message: "Incorrect password" };

    return { status: 200, message: "You have successfully logged in" };
  } catch (error) {
    console.error(`Error with signing in: ${error}`);
    return { status: 500, message: "Something went wrong" };
  }
}

export async function signUp(
  fullName: string,
  email: string,
  password: string,
): Promise<IResponse> {
  try {
    await connectDatabase();

    const existedUser = await UserModel.findOne({ email });

    if (!existedUser) {
      const hashedPassword = await bcryptjs.hash(password, 10);
      await UserModel.create({ fullName, email, password: hashedPassword });

      return { status: 200, message: "You have successfully signed up" };
    } else
      return {
        status: 400,
        message: "Your have already signed up. Please sign in",
      };
  } catch (error) {
    console.error(error);
    return { status: 500, message: "Something went wrong" };
  }
}

export async function updatePassword(
  email: string,
  newPassword: string,
): Promise<IResponse> {
  try {
    await connectDatabase();
    const hashedPassword = await bcryptjs.hash(newPassword, 10);
    await UserModel.findOneAndUpdate({ email }, { password: hashedPassword });

    return {
      status: 200,
      message: "Your password has been changed successfully",
    };
  } catch (e) {
    console.error(`Error with updating password: ${e}`);
    return { status: 500, message: "Something went wrong" };
  }
}
