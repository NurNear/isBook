import { Boxes, MoveRight } from "lucide-react";

import { AppShell } from "@/components/layout/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { myBooks } from "@/services/mock-data";

const storageTree = [
  {
    location: "Ideo Charan70",
    storages: [
      {
        name: "BookShelf Floor1",
        shelves: ["Shelf 1", "Shelf 2"],
      },
    ],
  },
  {
    location: "Home Office",
    storages: [
      {
        name: "White Cabinet",
        shelves: ["Shelf A"],
      },
    ],
  },
];

export default function StoragePage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <section>
          <h1 className="text-2xl font-semibold tracking-normal">Storage management</h1>
          <p className="mt-1 text-slate-600">Organize books by location, storage unit, and shelf.</p>
        </section>
        <section className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <Card className="rounded-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Boxes className="size-5 text-emerald-700" />
                Storage tree
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {storageTree.map((location) => (
                <div key={location.location} className="space-y-2">
                  <div className="font-medium">{location.location}</div>
                  {location.storages.map((storage) => (
                    <div key={storage.name} className="ml-4 border-l pl-4">
                      <div className="text-sm font-medium text-slate-700">{storage.name}</div>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {storage.shelves.map((shelf) => (
                          <Badge key={shelf} variant="outline">
                            {shelf}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </CardContent>
          </Card>
          <Card className="rounded-lg">
            <CardHeader>
              <CardTitle className="text-base">Books by shelf</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {myBooks.map((book) => (
                <div key={book.id} className="flex flex-col gap-2 rounded-md border p-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="font-medium">{book.series.titleTh} Vol. {book.volume.volumeNo}</div>
                    <div className="text-sm text-slate-500">
                      {book.shelfPath.location} / {book.shelfPath.storage} / {book.shelfPath.shelf}
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <MoveRight className="size-4" />
                    Move
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>
      </div>
    </AppShell>
  );
}
