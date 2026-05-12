import { Database, KeyRound } from "lucide-react";

import { AppShell } from "@/components/layout/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const envItems = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  "SUPABASE_SERVICE_ROLE_KEY",
  "GOOGLE_BOOKS_API_KEY",
  "RAKUTEN_APP_ID",
];

export default function SettingsPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <section>
          <h1 className="text-2xl font-semibold tracking-normal">Settings</h1>
          <p className="mt-1 text-slate-600">Configure Supabase, book APIs, and project setup values.</p>
        </section>
        <section className="grid gap-4 lg:grid-cols-2">
          <Card className="rounded-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <KeyRound className="size-5 text-emerald-700" />
                Environment variables
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {envItems.map((item) => (
                <code key={item} className="block rounded-md border bg-slate-50 px-3 py-2 text-sm">
                  {item}
                </code>
              ))}
            </CardContent>
          </Card>
          <Card className="rounded-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Database className="size-5 text-emerald-700" />
                Database schema
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-600">
              Run <code className="rounded bg-slate-100 px-1 py-0.5">supabase/schema.sql</code> in Supabase SQL Editor
              before connecting real data.
            </CardContent>
          </Card>
        </section>
      </div>
    </AppShell>
  );
}
