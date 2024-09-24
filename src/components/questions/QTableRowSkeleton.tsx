import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";

export const QTableRowSkeleton = () => {
  return (
    <TableRow >
      <TableCell>
        <Skeleton className="h-6 w-6 rounded-full" />
      </TableCell>
      <TableCell className="font-medium">
        <Skeleton className="h-4 md:w-96 w-20" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-20" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-20" />
      </TableCell>
      <TableCell className="hidden md:table-cell">
        <Skeleton className="h-4 w-20" />
      </TableCell>
      
    </TableRow>
  );
};