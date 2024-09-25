import { Badge } from "@/components/ui/badge";
import { TableCell, TableRow } from "@/components/ui/table";
import { QuestionTableProps } from "@/types";
import { CircleCheck, Circle  } from "lucide-react";
import Link from "next/link";

export const QTableRow = ({ problem }: { problem: QuestionTableProps }) => {
  console.log(problem)
  return (
    <TableRow key={problem.id} className="sm:text-sm">
      <TableCell>
        {
          problem.Status === "UNSOLVED" ? <Circle /> : <CircleCheck color="green" />
        }
        {/* <CircleCheck color="green" /> */}
      </TableCell>
      <TableCell className="hidden md:table-cell"    >{problem.class}</TableCell>
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
      <TableCell className="font-medium ">
        <Link
          href={`/questions/${problem.slug}`}
          className="hover:text-yellow-600 "
        >
          {`${problem.topic}`}
        </Link>
      </TableCell>
      <TableCell >{problem.accuracy}%</TableCell>
      
      <TableCell className="hidden md:table-cell">{problem.subject}</TableCell>
      
    </TableRow>
  );
};