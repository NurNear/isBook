import { AlertTriangle, CopyCheck } from "lucide-react";

import { CollectionTable } from "@/components/books/collection-table";
import { AppShell } from "@/components/layout/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { bookSeries, myBooks } from "@/services/mock-data";
import { getDuplicateBooks, getMissingVolumes, getOwnedVolumes } from "@/utils/collection";

export default function CollectionPage() {
  const duplicateBooks = getDuplicateBooks(myBooks);
  const missingCount = bookSeries.reduce((sum, series) => {
    const owned = getOwnedVolumes(myBooks, series.id);
    return sum + getMissingVolumes(owned, series.latestVolumeTh).length;
  }, 0);

  return (
    <AppShell>
      <div className="space-y-6">
        <section>
          <h1 className="text-2xl font-semibold tracking-normal">My collection</h1>
          <p className="mt-1 text-slate-600">Track owned volumes, quantities, missing numbers, and duplicates.</p>
        </section>
        <section className="grid gap-4 md:grid-cols-2">
          <Card className="rounded-lg">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base">Missing volumes</CardTitle>
              <AlertTriangle className="size-5 text-amber-600" />
            </CardHeader>
            <CardContent className="text-3xl font-semibold">{missingCount}</CardContent>
          </Card>
          <Card className="rounded-lg">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base">Duplicate items</CardTitle>
              <CopyCheck className="size-5 text-emerald-700" />
            </CardHeader>
            <CardContent className="text-3xl font-semibold">{duplicateBooks.length}</CardContent>
          </Card>
        </section>
        <CollectionTable />
      </div>
    </AppShell>
  );
}
