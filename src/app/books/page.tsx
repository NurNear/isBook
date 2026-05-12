import { RefreshCw } from "lucide-react";

import { BookSeriesTable } from "@/components/books/book-series-table";
import { QuickAddBook } from "@/components/books/quick-add-book";
import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";

export default function BooksPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <section className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-normal">Book catalog</h1>
            <p className="mt-1 text-slate-600">Manage series, ISBN data, publishers, and latest volume tracking.</p>
          </div>
          <Button variant="outline">
            <RefreshCw className="size-4" />
            Refresh volumes
          </Button>
        </section>
        <QuickAddBook />
        <BookSeriesTable />
      </div>
    </AppShell>
  );
}
