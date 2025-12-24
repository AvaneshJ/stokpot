"use server";

import { auth } from "@/lib/better-auth/auth";
import { inngest } from "../inngest/client";
import { headers } from "next/headers";
export const signUpWithEmail = async ({
  fullName,
  email,
  password,
  country,
  investmentGoals,
  riskTolerance,
  preferredIndustry,
}: SignUpFormData) => {
  try {
    const res = await auth.api.signUpEmail({
      body: {
        email: email,
        password: password,
        name: fullName,
      },
    });
    if (res) {
      await inngest.send({
        name: "app/user.created",
        data: {
          email,
          name: fullName,
          country,
          investmentGoals,
          riskTolerance,
          preferredIndustry,
        },
      });
    }

    return { success: true, message: "Sign up successful" };
  } catch (err) {
    console.log("Sign up failed", err);
    return { success: false, message: "Sign up failed" };
  }
};

export const signOut = async () => {
  try {
    await auth.api.signOut({ headers: await headers() });
  } catch (e) {
    console.log("Sign out failed", e);
    return { success: false, message: "Sign out failed" };
  }
};

export const signInWithEmail = async ({ email, password }: SignInFormData) => {
  try {
    const res = await auth.api.signInEmail({
      body: {
        email: email,
        password: password,
      },
    });

    return { success: true, message: "Sign in successful", data: res };
  } catch (err) {
    console.log("Sign in failed", err);
    return { success: false, message: "Sign in failed" };
  }
};
