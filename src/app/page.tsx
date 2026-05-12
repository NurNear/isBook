import { AlertTriangle, BookOpen, Boxes, CheckCircle2, Users } from "lucide-react";

import { BookSeriesTable } from "@/components/books/book-series-table";
import { CollectionTable } from "@/components/books/collection-table";
import { AppShell } from "@/components/layout/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { bookSeries, borrowRecords, myBooks } from "@/services/mock-data";
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
          <h1 className="text-2xl font-semibold tracking-normal">Collection overview</h1>
          <p className="mt-1 text-slate-600">
            Track books, volumes, locations, duplicates, and borrowed items from one workspace.
          </p>
        </section>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {metrics.map((metric) => {
            const Icon = metric.icon;

            return (
              <Card key={metric.label} className="rounded-lg">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-600">{metric.label}</CardTitle>
                  <Icon className="size-4 text-emerald-700" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-semibold">{metric.value}</div>
                </CardContent>
              </Card>
            );
          })}
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-3">
            <h2 className="text-lg font-semibold">Book catalog</h2>
            <BookSeriesTable />
          </div>
          <div className="space-y-3">
            <h2 className="text-lg font-semibold">Recent collection</h2>
            <CollectionTable />
          </div>
        </section>
      </div>
    </AppShell>
  );
}
