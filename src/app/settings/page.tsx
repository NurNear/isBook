import { FileJson, KeyRound } from "lucide-react";

import { AppShell } from "@/components/layout/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const envItems = [
  "GOOGLE_BOOKS_API_KEY",
  "RAKUTEN_APP_ID",
];

export default function SettingsPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <section>
          <h1 className="text-2xl font-semibold tracking-normal">Settings</h1>
          <p className="mt-1 text-slate-600">Configure local JSON storage, book APIs, and project setup values.</p>
        </section>
        <section className="grid gap-4 lg:grid-cols-2">
          <Card className="rounded-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <KeyRound className="size-5 text-pink-500" />
                Optional API variables
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {envItems.map((item) => (
                <code key={item} className="block rounded-md border border-pink-100 bg-pink-50/70 px-3 py-2 text-sm">
                  {item}
                </code>
              ))}
              <p className="text-sm text-slate-500">
                These are only needed when external book lookups are implemented.
              </p>
            </CardContent>
          </Card>
          <Card className="rounded-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <FileJson className="size-5 text-pink-500" />
                Local JSON storage
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-600">
              Seed data lives in <code className="rounded bg-pink-50 px-1 py-0.5">src/data/library.json</code>. On Vercel,
              runtime edits should be saved in the browser with localStorage or exported as a JSON backup.
            </CardContent>
          </Card>
        </section>
      </div>
    </AppShell>
  );
}
