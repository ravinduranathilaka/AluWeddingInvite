# Imaya & Shehan wedding invitation

The invitation frontend for Imaya Kehelkaduwa and Shehan Aluwihare, celebrating on 16 July 2027 at Cinnamon Life at City of Dreams.

## Local development

```powershell
npm install
npm run dev
```

Open `http://localhost:3000`. `/admin` is password-gated and is deliberately a database-ready shell until the Prisma/PostgreSQL phase begins.

## Deferred data layer

RSVP persistence, searching, and CRUD will be added after the repository/database decision. The future setup will use `DATABASE_URL`, `DIRECT_URL`, and `ADMIN_PASSWORD`; do not commit their values.
