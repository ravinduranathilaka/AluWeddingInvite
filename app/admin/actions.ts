"use server";

import { redirect } from "next/navigation";
import { acceptsAdminPassword, clearAdminSession, createAdminSession } from "./auth";

export type LoginState = { error?: string; success?: boolean };

export async function login(_: LoginState, formData: FormData): Promise<LoginState> {
  const password = String(formData.get("password") ?? "");
  if (!acceptsAdminPassword(password)) return { error: "That password does not match this admin area." };
  await createAdminSession();
  return { success: true };
}

export async function logout() {
  await clearAdminSession();
  redirect("/admin");
}
