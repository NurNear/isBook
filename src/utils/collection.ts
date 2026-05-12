import type { MyBook } from "@/types/book";

export function getOwnedVolumes(books: MyBook[], seriesId: string) {
  return books
    .filter((book) => book.series.id === seriesId)
    .map((book) => book.volume.volumeNo)
    .sort((a, b) => a - b);
}

export function getMissingVolumes(ownedVolumes: number[], latestVolume: number) {
  const owned = new Set(ownedVolumes);
  return Array.from({ length: latestVolume }, (_, index) => index + 1).filter(
    (volumeNo) => !owned.has(volumeNo),
  );
}

export function getDuplicateBooks(books: MyBook[]) {
  return books.filter((book) => book.quantity > 1);
}
