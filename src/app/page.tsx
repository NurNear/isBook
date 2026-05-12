import { AlertTriangle, BookOpen, Boxes, CheckCircle2, Users } from "lucide-react";

import { BookSeriesTable } from "@/components/books/book-series-table";
import { CollectionTable } from "@/components/books/collection-table";
import { AppShell } from "@/components/layout/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { bookSeries, borrowRecords, myBooks } from "@/services/library-data";
import { getDuplicateBooks, getMissingVolumes, getOwnedVolumes } from "@/utils/collection";

const totalMissing = bookSeries.reduce((sum, series) => {
  const owned = getOwnedVolumes(myBooks, series.id);
  return sum + getMissingVolumes(owned, series.latestVolumeTh).length;
}, 0);

const metrics = [
  { label: "Series", value: bookSeries.length, icon: BookOpen },
  { label: "Owned books", value: myBooks.reduce((sum, book) => sum + book.quantity, 0), icon: Boxes },
  { label: "Missing volumes", value: totalMissing, icon: AlertTriangle },
  { label: "Borrowed", value: borrowRecords.length, icon: Users },
  { label: "Duplicates", value: getDuplicateBooks(myBooks).length, icon: CheckCircle2 },
];

export default function Home() {
  return (
    <AppShell>
      <div className="space-y-6">
        <section>
          <div className="inline-flex rounded-full border border-pink-200 bg-white/70 px-3 py-1 text-sm font-medium text-pink-700 shadow-sm shadow-pink-100">
            Pastel shelf control
          </div>
          <h1 className="mt-3 text-2xl font-semibold tracking-normal text-slate-950">Collection overview</h1>
          <p className="mt-1 max-w-2xl text-slate-600">
            Track books, volumes, locations, duplicates, and borrowed items from one workspace.
          </p>
        </section>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {metrics.map((metric) => {
            const Icon = metric.icon;

            return (
              <Card key={metric.label} className="rounded-lg border-pink-100 bg-white/90 shadow-sm shadow-pink-100/70">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-600">{metric.label}</CardTitle>
                  <Icon className="size-4 text-pink-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-semibold">{metric.value}</div>
                </CardContent>
              </Card>
            );
          })}
        </section>

        <section className="grid min-w-0 gap-6 xl:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
          <div className="min-w-0 space-y-3">
            <h2 className="text-lg font-semibold">Book catalog</h2>
            <BookSeriesTable />
          </div>
          <div className="min-w-0 space-y-3">
            <h2 className="text-lg font-semibold">Recent collection</h2>
            <CollectionTable />
          </div>
        </section>
      </div>
    </AppShell>
  );
}
