import { RefreshCw } from "lucide-react";

import { LibraryCrudWorkbench } from "@/components/books/library-crud-workbench";
import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";

export default function BooksPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <section className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-normal">Book catalog</h1>
            <p className="mt-1 text-slate-600">Test create, read, update, and delete with browser JSON storage.</p>
          </div>
          <Button variant="outline">
            <RefreshCw className="size-4" />
            Refresh volumes
          </Button>
        </section>
        <LibraryCrudWorkbench />
      </div>
    </AppShell>
  );
}
