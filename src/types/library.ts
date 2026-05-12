import type { BookSeries, BookStatus, MyBook } from "@/types/book";

export type LibraryBorrowRecord = {
  id: string;
  bookId: string;
  borrowerName: string;
  borrowedAt: string;
  dueAt?: string;
  returnedAt?: string;
};

export type LibraryDocument = {
  bookSeries: BookSeries[];
  myBooks: MyBook[];
  borrowRecords: LibraryBorrowRecord[];
};

export type SeriesFormValues = {
  titleTh: string;
  titleJp: string;
  titleEn: string;
  category: BookSeries["category"];
  thaiPublisher: string;
  jpPublisher: string;
  latestVolumeTh: number;
  latestVolumeJp: number;
};

export type CollectionFormValues = {
  seriesId: string;
  volumeNo: number;
  isbn: string;
  quantity: number;
  status: BookStatus;
  location: string;
  storage: string;
  shelf: string;
  borrowerName: string;
};
