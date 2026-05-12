import type { BookSeries, BorrowRecord, MyBook } from "@/types/book";

export const bookSeries: BookSeries[] = [
  {
    id: "one-piece",
    titleTh: "One Piece",
    titleJp: "ワンピース",
    category: "manga",
    thaiPublisher: "Siam Inter Comics",
    jpPublisher: "Shueisha",
    latestVolumeTh: 107,
    latestVolumeJp: 111,
  },
  {
    id: "frieren",
    titleTh: "Frieren: Beyond Journey's End",
    titleJp: "葬送のフリーレン",
    category: "manga",
    thaiPublisher: "Siam Inter Comics",
    jpPublisher: "Shogakukan",
    latestVolumeTh: 12,
    latestVolumeJp: 13,
  },
  {
    id: "three-body",
    titleTh: "The Three-Body Problem",
    category: "novel",
    thaiPublisher: "Earnest Publishing",
    latestVolumeTh: 3,
    latestVolumeJp: 3,
  },
];

export const myBooks: MyBook[] = [
  {
    id: "op-001",
    series: bookSeries[0],
    volume: {
      id: "op-v001",
      seriesId: "one-piece",
      volumeNo: 1,
      isbn: "9786164910001",
      title: "One Piece Vol. 1",
      source: "manual",
    },
    quantity: 1,
    status: "AVAILABLE",
    shelfPath: {
      location: "Ideo Charan70",
      storage: "BookShelf Floor1",
      shelf: "Shelf 1",
    },
  },
  {
    id: "op-107",
    series: bookSeries[0],
    volume: {
      id: "op-v107",
      seriesId: "one-piece",
      volumeNo: 107,
      title: "One Piece Vol. 107",
      source: "manual",
    },
    quantity: 1,
    status: "BORROWED",
    borrowerName: "Mint",
    shelfPath: {
      location: "Ideo Charan70",
      storage: "BookShelf Floor1",
      shelf: "Shelf 2",
    },
  },
  {
    id: "frieren-012",
    series: bookSeries[1],
    volume: {
      id: "frieren-v012",
      seriesId: "frieren",
      volumeNo: 12,
      title: "Frieren Vol. 12",
      source: "openbd",
    },
    quantity: 2,
    status: "AVAILABLE",
    shelfPath: {
      location: "Home Office",
      storage: "White Cabinet",
      shelf: "Shelf A",
    },
  },
];

export const borrowRecords: BorrowRecord[] = [
  {
    id: "borrow-001",
    book: myBooks[1],
    borrowerName: "Mint",
    borrowedAt: "2026-05-01",
    dueAt: "2026-05-21",
  },
];
