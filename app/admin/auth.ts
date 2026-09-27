import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const cookieName = "alu-wedding-admin";
const sessionDuration = 12 * 60 * 60;

const digest = (value: string) => createHmac("sha256", "alu-wedding-admin-password-check").update(value).digest();
const matches = (value: string, expected?: string) => Boolean(expected) && timingSafeEqual(digest(value), digest(expected!));
const sign = (value: string) => createHmac("sha256", process.env.ADMIN_PASSWORD ?? "").update(value).digest("base64url");

export async function createAdminSession() {
  const expires = Math.floor(Date.now() / 1000) + sessionDuration;
  const payload = `admin.${expires}`;
  (await cookies()).set(cookieName, `${payload}.${sign(payload)}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/admin",
    maxAge: sessionDuration,
  });
}

export async function hasAdminSession() {
  const value = (await cookies()).get(cookieName)?.value;
  if (!value) return false;
  const [role, expires, signature] = value.split(".");
  const payload = `${role}.${expires}`;
  return role === "admin" && Number(expires) > Date.now() / 1000 && Boolean(signature) && matches(signature, sign(payload));
}

export async function clearAdminSession() { (await cookies()).delete(cookieName); }

export function acceptsAdminPassword(password: string) { return matches(password, process.env.ADMIN_PASSWORD); }
