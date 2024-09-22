import { Badge } from "@/components/ui/badge";
import { TableCell, TableRow } from "@/components/ui/table";
import { CircleCheck, Circle  } from "lucide-react";
import Link from "next/link";

export const QTableRow = ({ problem }: { problem: any }) => {
  console.log(problem)
  return (
    <TableRow key={problem.id}>
      <TableCell>
        {
          problem.Status === "UNSOLVED" ? <Circle /> : <CircleCheck color="green" />
        }
        {/* <CircleCheck color="green" /> */}
      </TableCell>
      <TableCell className="font-medium">
        <Link
          href={`/questions/${problem.slug}`} //!Change this _id make it private
          className="hover:text-yellow-600"
        >
          {problem.topic}
        </Link>
      </TableCell>
      <TableCell >{problem.accuracy}%</TableCell>
      <TableCell>
        <Badge
          variant={
            problem.difficulty as
              | "default"
              | "Easy"
              | "Medium"
              | "Hard"
              | "destructive"
              | "outline"
              | "secondary"
              | null
              | undefined
          }
        >
          {problem.difficulty}
        </Badge>
      </TableCell>
      <TableCell className="hidden md:table-cell">{problem.subject}</TableCell>
      
    </TableRow>
  );
};