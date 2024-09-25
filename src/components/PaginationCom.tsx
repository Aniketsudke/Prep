
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination";
  // import { useRouter, useSearchParams, usePathname } from "next/navigation";

  interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
  }

const PaginationCom = ({ currentPage, totalPages, onPageChange }:PaginationProps) => {
  // const router = useRouter();
  // const searchParams = useSearchParams();
  // const pathname = usePathname();

  // const currentPage = parseInt(searchParams.get("page") || "1", 10);

  // const handlePageChange = (page: number) => {
  //   const newParams = new URLSearchParams(searchParams.toString());
  //   newParams.set("page", page.toString());
  //   router.replace(`${pathname}?${newParams.toString()}`);
  // };
  const validTotalPages = Math.max(totalPages, 0); // Fallback to 0 if negative

  if (validTotalPages < 1) {
    return null; // Don't render if there are no pages
  }

  return (
    <Pagination>
      <PaginationContent>
        {/* Previous Button */}
        <PaginationItem>
          <PaginationPrevious
            onClick={() => onPageChange(currentPage - 1)}

            isActive={currentPage === 1}
          />
        </PaginationItem>

        {/* Page Numbers */}
        {Array.from({ length: validTotalPages }, (_, i) => (
          <PaginationItem key={i}>
            <PaginationLink
              href="#"
              className={currentPage === i + 1 ? "active" : ""}
              onClick={() => onPageChange(i + 1)}
            >
              {i + 1}
            </PaginationLink>
          </PaginationItem>
        ))}

        {/* Ellipsis - optional */}
        {currentPage < totalPages && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {/* Next Button */}
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={() => onPageChange(currentPage + 1)}
            isActive={currentPage === totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationCom;
