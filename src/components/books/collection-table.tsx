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
    <div className="overflow-hidden rounded-lg border bg-white">
      <Table>
        <TableHeader>
          <TableRow>
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
              <TableCell>
                <div className="font-medium">{book.series.titleTh}</div>
                <div className="text-sm text-slate-500">{book.volume.isbn ?? "No ISBN"}</div>
              </TableCell>
              <TableCell>{book.volume.volumeNo}</TableCell>
              <TableCell>
                <Badge variant={statusVariant[book.status]}>{book.status}</Badge>
              </TableCell>
              <TableCell className="text-sm text-slate-600">
                {book.shelfPath.location} / {book.shelfPath.storage} / {book.shelfPath.shelf}
              </TableCell>
              <TableCell>{book.quantity}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
