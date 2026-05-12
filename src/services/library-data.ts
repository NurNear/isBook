import libraryData from "@/data/library.json";
import type { BookSeries, BorrowRecord, MyBook } from "@/types/book";

type JsonBorrowRecord = Omit<BorrowRecord, "book"> & {
  bookId: string;
};

const data = libraryData as {
  bookSeries: BookSeries[];
  myBooks: MyBook[];
  borrowRecords: JsonBorrowRecord[];
};

export const bookSeries = data.bookSeries;

export const myBooks = data.myBooks;

export const borrowRecords: BorrowRecord[] = data.borrowRecords.map((record) => {
  const book = data.myBooks.find((item) => item.id === record.bookId);

  if (!book) {
    throw new Error(`Missing book for borrow record: ${record.id}`);
  }

  return {
    id: record.id,
    book,
    borrowerName: record.borrowerName,
    borrowedAt: record.borrowedAt,
    dueAt: record.dueAt,
    returnedAt: record.returnedAt,
  };
});
