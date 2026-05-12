import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { bookSeries, myBooks } from "@/services/mock-data";
import { getMissingVolumes, getOwnedVolumes } from "@/utils/collection";

export function BookSeriesTable() {
  return (
    <div className="w-full min-w-0 overflow-hidden rounded-lg border border-pink-100 bg-white/90 shadow-sm shadow-pink-100/70 backdrop-blur">
      <div className="w-full overflow-x-auto">
      <Table className="min-w-[680px]">
        <TableHeader>
          <TableRow className="bg-pink-50/80 hover:bg-pink-50/80">
            <TableHead>Series</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Owned</TableHead>
            <TableHead>Missing</TableHead>
            <TableHead>Publisher</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookSeries.map((series) => {
            const ownedVolumes = getOwnedVolumes(myBooks, series.id);
            const missingVolumes = getMissingVolumes(ownedVolumes, series.latestVolumeTh);

            return (
              <TableRow key={series.id}>
                <TableCell className="max-w-52">
                  <div className="font-medium">{series.titleTh}</div>
                  <div className="truncate text-sm text-pink-900/55">{series.titleJp ?? series.titleEn}</div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="border-pink-200 bg-white text-pink-700 capitalize">
                    {series.category}
                  </Badge>
                </TableCell>
                <TableCell>
                  {ownedVolumes.length}/{series.latestVolumeTh}
                </TableCell>
                <TableCell className="max-w-52 truncate text-sm text-slate-600">
                  {missingVolumes.length > 0 ? missingVolumes.slice(0, 8).join(", ") : "Complete"}
                  {missingVolumes.length > 8 ? " ..." : ""}
                </TableCell>
                <TableCell className="max-w-40 truncate">{series.thaiPublisher ?? "-"}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      </div>
    </div>
  );
}
