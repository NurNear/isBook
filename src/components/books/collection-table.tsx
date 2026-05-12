import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { myBooks } from "@/services/mock-data";

const statusVariant = {
  AVAILABLE: "default",
  BORROWED: "secondary",
  MISSING: "destructive",
  RESERVED: "outline",
} as const;

export function CollectionTable() {
  return (
    <div className="w-full min-w-0 overflow-hidden rounded-lg border border-pink-100 bg-white/90 shadow-sm shadow-pink-100/70 backdrop-blur">
      <div className="w-full overflow-x-auto">
      <Table className="min-w-[760px]">
        <TableHeader>
          <TableRow className="bg-pink-50/80 hover:bg-pink-50/80">
            <TableHead>Book</TableHead>
            <TableHead>Volume</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Quantity</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {myBooks.map((book) => (
            <TableRow key={book.id}>
              <TableCell className="max-w-56">
                <div className="font-medium">{book.series.titleTh}</div>
                <div className="truncate text-sm text-pink-900/55">{book.volume.isbn ?? "No ISBN"}</div>
              </TableCell>
              <TableCell>{book.volume.volumeNo}</TableCell>
              <TableCell>
                <Badge variant={statusVariant[book.status]}>{book.status}</Badge>
              </TableCell>
              <TableCell className="max-w-72 truncate text-sm text-slate-600">
                {book.shelfPath.location} / {book.shelfPath.storage} / {book.shelfPath.shelf}
              </TableCell>
              <TableCell>{book.quantity}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </div>
    </div>
  );
}
