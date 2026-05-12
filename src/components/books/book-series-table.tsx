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
    <div className="overflow-hidden rounded-lg border bg-white">
      <Table>
        <TableHeader>
          <TableRow>
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
                <TableCell>
                  <div className="font-medium">{series.titleTh}</div>
                  <div className="text-sm text-slate-500">{series.titleJp ?? series.titleEn}</div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="capitalize">
                    {series.category}
                  </Badge>
                </TableCell>
                <TableCell>
                  {ownedVolumes.length}/{series.latestVolumeTh}
                </TableCell>
                <TableCell className="max-w-72 text-sm text-slate-600">
                  {missingVolumes.length > 0 ? missingVolumes.slice(0, 8).join(", ") : "Complete"}
                  {missingVolumes.length > 8 ? " ..." : ""}
                </TableCell>
                <TableCell>{series.thaiPublisher ?? "-"}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
