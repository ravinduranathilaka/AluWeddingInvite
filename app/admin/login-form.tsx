"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { login, type LoginState } from "./actions";

const initialState: LoginState = {};

export function LoginForm() {
  const router = useRouter();
  const [state, action, pending] = useActionState(login, initialState);
  useEffect(() => { if (state.success) router.refresh(); }, [router, state.success]);
  return <form action={action} className="admin-login-form">
    <label htmlFor="password">Admin password</label>
    <input id="password" name="password" type="password" autoComplete="current-password" required />
    {state.error && <p className="admin-error" role="alert">{state.error}</p>}
    <button type="submit" disabled={pending}>{pending ? "Opening…" : "Open RSVP desk"}</button>
  </form>;
}
