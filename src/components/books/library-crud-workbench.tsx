"use client";

import { useEffect, useMemo, useState } from "react";
import { Edit3, Plus, RotateCcw, Save, Trash2, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useLibraryStore } from "@/hooks/use-library-store";
import type { BookSeries, MyBook } from "@/types/book";
import type { CollectionFormValues, SeriesFormValues } from "@/types/library";

const emptySeriesForm: SeriesFormValues = {
  titleTh: "",
  titleJp: "",
  titleEn: "",
  category: "manga",
  thaiPublisher: "",
  jpPublisher: "",
  latestVolumeTh: 1,
  latestVolumeJp: 1,
};

const emptyCollectionForm: CollectionFormValues = {
  seriesId: "",
  volumeNo: 1,
  isbn: "",
  quantity: 1,
  status: "AVAILABLE",
  location: "",
  storage: "",
  shelf: "",
  borrowerName: "",
};

function seriesToForm(series: BookSeries): SeriesFormValues {
  return {
    titleTh: series.titleTh,
    titleJp: series.titleJp ?? "",
    titleEn: series.titleEn ?? "",
    category: series.category,
    thaiPublisher: series.thaiPublisher ?? "",
    jpPublisher: series.jpPublisher ?? "",
    latestVolumeTh: series.latestVolumeTh,
    latestVolumeJp: series.latestVolumeJp,
  };
}

function bookToForm(book: MyBook): CollectionFormValues {
  return {
    seriesId: book.series.id,
    volumeNo: book.volume.volumeNo,
    isbn: book.volume.isbn ?? "",
    quantity: book.quantity,
    status: book.status,
    location: book.shelfPath.location,
    storage: book.shelfPath.storage,
    shelf: book.shelfPath.shelf,
    borrowerName: book.borrowerName ?? "",
  };
}

export function LibraryCrudWorkbench() {
  const {
    library,
    isReady,
    stats,
    createSeries,
    updateSeries,
    deleteSeries,
    createCollectionBook,
    updateCollectionBook,
    deleteCollectionBook,
    resetLibrary,
  } = useLibraryStore();

  const [seriesForm, setSeriesForm] = useState<SeriesFormValues>(emptySeriesForm);
  const [collectionForm, setCollectionForm] = useState<CollectionFormValues>(emptyCollectionForm);
  const [editingSeriesId, setEditingSeriesId] = useState<string | null>(null);
  const [editingBookId, setEditingBookId] = useState<string | null>(null);

  useEffect(() => {
    if (!collectionForm.seriesId && library.bookSeries[0]) {
      setCollectionForm((current) => ({ ...current, seriesId: library.bookSeries[0].id }));
    }
  }, [collectionForm.seriesId, library.bookSeries]);

  const selectedSeries = useMemo(
    () => library.bookSeries.find((series) => series.id === collectionForm.seriesId),
    [collectionForm.seriesId, library.bookSeries],
  );

  function submitSeries() {
    if (!seriesForm.titleTh.trim()) {
      return;
    }

    if (editingSeriesId) {
      updateSeries(editingSeriesId, seriesForm);
    } else {
      createSeries(seriesForm);
    }

    setSeriesForm(emptySeriesForm);
    setEditingSeriesId(null);
  }

  function submitCollectionBook() {
    if (!selectedSeries) {
      return;
    }

    if (editingBookId) {
      updateCollectionBook(editingBookId, collectionForm);
    } else {
      createCollectionBook(collectionForm);
    }

    setCollectionForm({ ...emptyCollectionForm, seriesId: selectedSeries.id });
    setEditingBookId(null);
  }

  if (!isReady) {
    return <div className="rounded-lg border border-pink-100 bg-white/80 p-4 text-sm text-slate-500">Loading CRUD workspace...</div>;
  }

  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-3">
        <Card className="rounded-lg border-pink-100 bg-white/90 shadow-sm shadow-pink-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-slate-600">Series in browser</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold">{stats.seriesCount}</CardContent>
        </Card>
        <Card className="rounded-lg border-pink-100 bg-white/90 shadow-sm shadow-pink-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-slate-600">Owned quantity</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold">{stats.collectionCount}</CardContent>
        </Card>
        <Card className="rounded-lg border-pink-100 bg-white/90 shadow-sm shadow-pink-100">
          <CardContent className="flex h-full items-center justify-between gap-3 p-4">
            <div className="text-sm text-slate-600">
              Data is saved in this browser&apos;s localStorage.
            </div>
            <Button type="button" variant="outline" onClick={resetLibrary}>
              <RotateCcw className="size-4" />
              Reset
            </Button>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <Card className="min-w-0 rounded-lg border-pink-100 bg-white/90 shadow-sm shadow-pink-100">
          <CardHeader>
            <CardTitle className="flex items-center justify-between gap-3 text-base">
              Series CRUD
              {editingSeriesId ? (
                <Badge variant="outline" className="border-pink-200 text-pink-700">
                  Editing
                </Badge>
              ) : null}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3 md:grid-cols-2">
              <Input placeholder="Title" value={seriesForm.titleTh} onChange={(event) => setSeriesForm({ ...seriesForm, titleTh: event.target.value })} />
              <Input placeholder="Japanese title" value={seriesForm.titleJp} onChange={(event) => setSeriesForm({ ...seriesForm, titleJp: event.target.value })} />
              <Input placeholder="English title" value={seriesForm.titleEn} onChange={(event) => setSeriesForm({ ...seriesForm, titleEn: event.target.value })} />
              <select className="h-8 rounded-lg border border-pink-100 bg-white px-2 text-sm" value={seriesForm.category} onChange={(event) => setSeriesForm({ ...seriesForm, category: event.target.value as BookSeries["category"] })}>
                <option value="manga">Manga</option>
                <option value="novel">Novel</option>
                <option value="book">Book</option>
              </select>
              <Input placeholder="Thai publisher" value={seriesForm.thaiPublisher} onChange={(event) => setSeriesForm({ ...seriesForm, thaiPublisher: event.target.value })} />
              <Input placeholder="JP publisher" value={seriesForm.jpPublisher} onChange={(event) => setSeriesForm({ ...seriesForm, jpPublisher: event.target.value })} />
              <Input type="number" min={0} placeholder="Latest TH" value={seriesForm.latestVolumeTh} onChange={(event) => setSeriesForm({ ...seriesForm, latestVolumeTh: Number(event.target.value) })} />
              <Input type="number" min={0} placeholder="Latest JP" value={seriesForm.latestVolumeJp} onChange={(event) => setSeriesForm({ ...seriesForm, latestVolumeJp: Number(event.target.value) })} />
            </div>
            <div className="flex flex-wrap gap-2">
              <Button type="button" onClick={submitSeries}>
                {editingSeriesId ? <Save className="size-4" /> : <Plus className="size-4" />}
                {editingSeriesId ? "Update series" : "Add series"}
              </Button>
              {editingSeriesId ? (
                <Button type="button" variant="outline" onClick={() => { setEditingSeriesId(null); setSeriesForm(emptySeriesForm); }}>
                  <X className="size-4" />
                  Cancel
                </Button>
              ) : null}
            </div>
            <div className="overflow-x-auto rounded-lg border border-pink-100">
              <Table className="min-w-[620px]">
                <TableHeader>
                  <TableRow className="bg-pink-50/80">
                    <TableHead>Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Latest</TableHead>
                    <TableHead>Publisher</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {library.bookSeries.map((series) => (
                    <TableRow key={series.id}>
                      <TableCell className="max-w-52 truncate font-medium">{series.titleTh}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="border-pink-200 text-pink-700 capitalize">
                          {series.category}
                        </Badge>
                      </TableCell>
                      <TableCell>{series.latestVolumeTh}/{series.latestVolumeJp}</TableCell>
                      <TableCell className="max-w-40 truncate">{series.thaiPublisher ?? "-"}</TableCell>
                      <TableCell>
                        <div className="flex justify-end gap-2">
                          <Button type="button" size="icon-sm" variant="outline" aria-label="Edit series" onClick={() => { setEditingSeriesId(series.id); setSeriesForm(seriesToForm(series)); }}>
                            <Edit3 className="size-4" />
                          </Button>
                          <Button type="button" size="icon-sm" variant="destructive" aria-label="Delete series" onClick={() => deleteSeries(series.id)}>
                            <Trash2 className="size-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <Card className="min-w-0 rounded-lg border-pink-100 bg-white/90 shadow-sm shadow-pink-100">
          <CardHeader>
            <CardTitle className="flex items-center justify-between gap-3 text-base">
              Collection CRUD
              {editingBookId ? (
                <Badge variant="outline" className="border-pink-200 text-pink-700">
                  Editing
                </Badge>
              ) : null}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3 md:grid-cols-2">
              <select className="h-8 rounded-lg border border-pink-100 bg-white px-2 text-sm" value={collectionForm.seriesId} onChange={(event) => setCollectionForm({ ...collectionForm, seriesId: event.target.value })}>
                {library.bookSeries.map((series) => (
                  <option key={series.id} value={series.id}>
                    {series.titleTh}
                  </option>
                ))}
              </select>
              <Input type="number" min={1} placeholder="Volume" value={collectionForm.volumeNo} onChange={(event) => setCollectionForm({ ...collectionForm, volumeNo: Number(event.target.value) })} />
              <Input placeholder="ISBN" value={collectionForm.isbn} onChange={(event) => setCollectionForm({ ...collectionForm, isbn: event.target.value })} />
              <Input type="number" min={1} placeholder="Quantity" value={collectionForm.quantity} onChange={(event) => setCollectionForm({ ...collectionForm, quantity: Number(event.target.value) })} />
              <select className="h-8 rounded-lg border border-pink-100 bg-white px-2 text-sm" value={collectionForm.status} onChange={(event) => setCollectionForm({ ...collectionForm, status: event.target.value as CollectionFormValues["status"] })}>
                <option value="AVAILABLE">Available</option>
                <option value="BORROWED">Borrowed</option>
                <option value="MISSING">Missing</option>
                <option value="RESERVED">Reserved</option>
              </select>
              <Input placeholder="Borrower" value={collectionForm.borrowerName} onChange={(event) => setCollectionForm({ ...collectionForm, borrowerName: event.target.value })} />
              <Input placeholder="Location" value={collectionForm.location} onChange={(event) => setCollectionForm({ ...collectionForm, location: event.target.value })} />
              <Input placeholder="Storage" value={collectionForm.storage} onChange={(event) => setCollectionForm({ ...collectionForm, storage: event.target.value })} />
              <Input placeholder="Shelf" value={collectionForm.shelf} onChange={(event) => setCollectionForm({ ...collectionForm, shelf: event.target.value })} />
            </div>
            <div className="flex flex-wrap gap-2">
              <Button type="button" onClick={submitCollectionBook} disabled={!selectedSeries}>
                {editingBookId ? <Save className="size-4" /> : <Plus className="size-4" />}
                {editingBookId ? "Update book" : "Add book"}
              </Button>
              {editingBookId ? (
                <Button type="button" variant="outline" onClick={() => { setEditingBookId(null); setCollectionForm({ ...emptyCollectionForm, seriesId: library.bookSeries[0]?.id ?? "" }); }}>
                  <X className="size-4" />
                  Cancel
                </Button>
              ) : null}
            </div>
            <div className="overflow-x-auto rounded-lg border border-pink-100">
              <Table className="min-w-[720px]">
                <TableHeader>
                  <TableRow className="bg-pink-50/80">
                    <TableHead>Book</TableHead>
                    <TableHead>Volume</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Qty</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {library.myBooks.map((book) => (
                    <TableRow key={book.id}>
                      <TableCell className="max-w-52 truncate font-medium">{book.series.titleTh}</TableCell>
                      <TableCell>{book.volume.volumeNo}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="border-pink-200 text-pink-700">
                          {book.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="max-w-56 truncate">
                        {book.shelfPath.location} / {book.shelfPath.storage} / {book.shelfPath.shelf}
                      </TableCell>
                      <TableCell>{book.quantity}</TableCell>
                      <TableCell>
                        <div className="flex justify-end gap-2">
                          <Button type="button" size="icon-sm" variant="outline" aria-label="Edit book" onClick={() => { setEditingBookId(book.id); setCollectionForm(bookToForm(book)); }}>
                            <Edit3 className="size-4" />
                          </Button>
                          <Button type="button" size="icon-sm" variant="destructive" aria-label="Delete book" onClick={() => deleteCollectionBook(book.id)}>
                            <Trash2 className="size-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
