export type BookStatus = "AVAILABLE" | "BORROWED" | "MISSING" | "RESERVED";

export type BookSeries = {
  id: string;
  titleTh: string;
  titleJp?: string;
  titleEn?: string;
  category: "manga" | "novel" | "book";
  thaiPublisher?: string;
  jpPublisher?: string;
  coverImageUrl?: string;
  latestVolumeTh: number;
  latestVolumeJp: number;
};

export type BookVolume = {
  id: string;
  seriesId: string;
  volumeNo: number;
  isbn?: string;
  title: string;
  source: "manual" | "google-books" | "openbd" | "rakuten";
};

export type ShelfPath = {
  location: string;
  storage: string;
  shelf: string;
};

export type MyBook = {
  id: string;
  series: BookSeries;
  volume: BookVolume;
  quantity: number;
  status: BookStatus;
  shelfPath: ShelfPath;
  borrowerName?: string;
  note?: string;
};

export type BorrowRecord = {
  id: string;
  book: MyBook;
  borrowerName: string;
  borrowedAt: string;
  dueAt?: string;
  returnedAt?: string;
};
