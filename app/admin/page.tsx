import Link from "next/link";
import { hasAdminSession } from "./auth";
import { logout } from "./actions";
import { LoginForm } from "./login-form";

export default async function AdminPage() {
  if (!(await hasAdminSession())) {
    return <main className="admin-login"><section><p className="eyebrow">Imaya &amp; Shehan</p><div className="admin-seal" aria-hidden="true">I <i>&amp;</i> S</div><h1>The RSVP desk</h1><p>Enter the wedding admin password to manage guest responses.</p><LoginForm /><Link href="/">← Return to invitation</Link></section></main>;
  }

  return <main className="admin-shell">
    <header><div><p className="eyebrow">Imaya &amp; Shehan · 16 July 2027</p><h1>RSVP desk</h1></div><form action={logout}><button className="admin-signout" type="submit">Sign out</button></form></header>
    <section className="admin-pending">
      <span aria-hidden="true">✦</span>
      <p className="eyebrow">Database setup pending</p>
      <h2>The RSVP table will appear here.</h2>
      <p>Prisma and the PostgreSQL connection are intentionally deferred until this repository is ready. This protected area is already wired to <code>ADMIN_PASSWORD</code>; the next phase adds searchable RSVP records and create, edit, and delete actions.</p>
    </section>
  </main>;
}
