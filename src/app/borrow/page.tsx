import { Undo2 } from "lucide-react";

import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { borrowRecords } from "@/services/mock-data";

export default function BorrowPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <section>
          <h1 className="text-2xl font-semibold tracking-normal">Borrow system</h1>
          <p className="mt-1 text-slate-600">Record borrowed books, return dates, borrowers, and loan history.</p>
        </section>
        <div className="overflow-hidden rounded-lg border bg-white">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Book</TableHead>
                <TableHead>Borrower</TableHead>
                <TableHead>Borrowed</TableHead>
                <TableHead>Due</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {borrowRecords.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>{record.book.series.titleTh} Vol. {record.book.volume.volumeNo}</TableCell>
                  <TableCell>{record.borrowerName}</TableCell>
                  <TableCell>{record.borrowedAt}</TableCell>
                  <TableCell>{record.dueAt ?? "-"}</TableCell>
                  <TableCell className="text-right">
                    <Button size="sm" variant="outline">
                      <Undo2 className="size-4" />
                      Return
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </AppShell>
  );
}
