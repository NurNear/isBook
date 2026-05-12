"use client";

import { useEffect, useMemo, useState } from "react";

import seedData from "@/data/library.json";
import type { BookSeries, MyBook } from "@/types/book";
import type { CollectionFormValues, LibraryDocument, SeriesFormValues } from "@/types/library";

const STORAGE_KEY = "isbook-library-v1";

function slugify(value: string) {
  const slug = value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

  return slug || crypto.randomUUID();
}

function toSeries(values: SeriesFormValues, id?: string): BookSeries {
  return {
    id: id ?? slugify(values.titleTh),
    titleTh: values.titleTh.trim(),
    titleJp: values.titleJp.trim() || undefined,
    titleEn: values.titleEn.trim() || undefined,
    category: values.category,
    thaiPublisher: values.thaiPublisher.trim() || undefined,
    jpPublisher: values.jpPublisher.trim() || undefined,
    latestVolumeTh: values.latestVolumeTh,
    latestVolumeJp: values.latestVolumeJp,
  };
}

function toCollectionBook(values: CollectionFormValues, series: BookSeries, id?: string): MyBook {
  const bookId = id ?? `${series.id}-${values.volumeNo}-${crypto.randomUUID().slice(0, 8)}`;

  return {
    id: bookId,
    series,
    volume: {
      id: `${bookId}-volume`,
      seriesId: series.id,
      volumeNo: values.volumeNo,
      isbn: values.isbn.trim() || undefined,
      title: `${series.titleTh} Vol. ${values.volumeNo}`,
      source: "manual",
    },
    quantity: values.quantity,
    status: values.status,
    borrowerName: values.borrowerName.trim() || undefined,
    shelfPath: {
      location: values.location.trim() || "Unassigned",
      storage: values.storage.trim() || "Unassigned",
      shelf: values.shelf.trim() || "Unassigned",
    },
  };
}

export function useLibraryStore() {
  const [library, setLibrary] = useState<LibraryDocument>(seedData as LibraryDocument);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);

    if (saved) {
      setLibrary(JSON.parse(saved) as LibraryDocument);
    }

    setIsReady(true);
  }, []);

  useEffect(() => {
    if (isReady) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(library, null, 2));
    }
  }, [isReady, library]);

  const stats = useMemo(
    () => ({
      seriesCount: library.bookSeries.length,
      collectionCount: library.myBooks.reduce((total, book) => total + book.quantity, 0),
    }),
    [library],
  );

  function createSeries(values: SeriesFormValues) {
    setLibrary((current) => ({
      ...current,
      bookSeries: [...current.bookSeries, toSeries(values)],
    }));
  }

  function updateSeries(id: string, values: SeriesFormValues) {
    const updatedSeries = toSeries(values, id);

    setLibrary((current) => ({
      ...current,
      bookSeries: current.bookSeries.map((series) => (series.id === id ? updatedSeries : series)),
      myBooks: current.myBooks.map((book) =>
        book.series.id === id
          ? {
              ...book,
              series: updatedSeries,
              volume: {
                ...book.volume,
                title: `${updatedSeries.titleTh} Vol. ${book.volume.volumeNo}`,
              },
            }
          : book,
      ),
    }));
  }

  function deleteSeries(id: string) {
    setLibrary((current) => ({
      ...current,
      bookSeries: current.bookSeries.filter((series) => series.id !== id),
      myBooks: current.myBooks.filter((book) => book.series.id !== id),
      borrowRecords: current.borrowRecords.filter((record) => {
        const book = current.myBooks.find((item) => item.id === record.bookId);
        return book?.series.id !== id;
      }),
    }));
  }

  function createCollectionBook(values: CollectionFormValues) {
    const series = library.bookSeries.find((item) => item.id === values.seriesId);

    if (!series) {
      return;
    }

    setLibrary((current) => ({
      ...current,
      myBooks: [...current.myBooks, toCollectionBook(values, series)],
    }));
  }

  function updateCollectionBook(id: string, values: CollectionFormValues) {
    const series = library.bookSeries.find((item) => item.id === values.seriesId);

    if (!series) {
      return;
    }

    setLibrary((current) => ({
      ...current,
      myBooks: current.myBooks.map((book) => (book.id === id ? toCollectionBook(values, series, id) : book)),
    }));
  }

  function deleteCollectionBook(id: string) {
    setLibrary((current) => ({
      ...current,
      myBooks: current.myBooks.filter((book) => book.id !== id),
      borrowRecords: current.borrowRecords.filter((record) => record.bookId !== id),
    }));
  }

  function resetLibrary() {
    setLibrary(seedData as LibraryDocument);
  }

  return {
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
  };
}
