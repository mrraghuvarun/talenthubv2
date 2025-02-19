import React from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const TablePagination = ({
  currentPage,
  setCurrentPage,
  pageSize,
  setPageSize,
  totalItems
}) => {
  const pageCount = Math.ceil(totalItems / pageSize);
  const startIndex = currentPage * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalItems);

  return (
    <div className="ml-auto max-w-[700px] flex flex-col md:flex-row lg:flex-row items-center justify-end gap-2 mt-4">
      <p className="text-xs text-gray-500">
        Showing {startIndex + 1} to {endIndex} of {totalItems} entries
      </p>

      <div>
        {pageCount > 1 && (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
                  disabled={currentPage === 0}
                  className={currentPage === 0 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
                />
              </PaginationItem>

              {pageCount <= 3 ? (
                [...Array(pageCount)].map((_, index) => (
                  <PaginationItem key={index}>
                    <PaginationLink
                      isActive={currentPage === index}
                      onClick={() => setCurrentPage(index)}
                      className="cursor-pointer"
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))
              ) : currentPage < 2 ? (
                <>
                  {[0, 1, 2].map((index) => (
                    <PaginationItem key={index}>
                      <PaginationLink
                        isActive={currentPage === index}
                        onClick={() => setCurrentPage(index)}
                        className="cursor-pointer"
                      >
                        {index + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                </>
              ) : currentPage >= pageCount - 3 ? (
                <>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  {[pageCount - 3, pageCount - 2, pageCount - 1].map((index) => (
                    <PaginationItem key={index}>
                      <PaginationLink
                        isActive={currentPage === index}
                        onClick={() => setCurrentPage(index)}
                        className="cursor-pointer"
                      >
                        {index + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                </>
              ) : (
                <>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  {[currentPage - 1, currentPage, currentPage + 1].map((index) => (
                    <PaginationItem key={index}>
                      <PaginationLink
                        isActive={currentPage === index}
                        onClick={() => setCurrentPage(index)}
                        className="cursor-pointer"
                      >
                        {index + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                </>
              )}

              <PaginationItem>
                <PaginationNext
                  onClick={() => setCurrentPage((p) => Math.min(pageCount - 1, p + 1))}
                  disabled={currentPage === pageCount - 1}
                  className={currentPage === pageCount - 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>

      <select
        value={pageSize}
        onChange={(e) => {
          setPageSize(Number(e.target.value));
          setCurrentPage(0);
        }}
        className="h-10 w-16 rounded border border-input bg-background px-3 ml-4 cursor-pointer text-center"
      >
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={50}>50</option>
      </select>
    </div>
  );
};

export default TablePagination;