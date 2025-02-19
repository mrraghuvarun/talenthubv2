import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const MagicLinkHistoryPopup = ({ magicLinks, onClose }) => {
  const [filterEmail, setFilterEmail] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const validMagicLinks = Array.isArray(magicLinks) ? magicLinks : [];

  const filteredMagicLinks = validMagicLinks
    .filter((link) => {
      const matchesEmail = link.email.toLowerCase().includes(filterEmail.toLowerCase());
      const isExpired = new Date(link.expires_at) < new Date();
      const matchesStatus =
        filterStatus === ""
          ? true
          : (filterStatus === "active" && !isExpired) ||
            (filterStatus === "expired" && isExpired);

      return matchesEmail && matchesStatus;
    })
    .reverse();

  const paginatedLinks = filteredMagicLinks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredMagicLinks.length / itemsPerPage);

  const clearFilters = () => {
    setFilterEmail("");
    setFilterStatus("");
    setCurrentPage(1);
  };

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  // Function to generate pagination numbers with ellipsis
  const generatePaginationRange = () => {
    const delta = 1; // Reduced from 2 to 1 to show fewer numbers on mobile
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-4 md:p-8 w-[95%] md:w-11/12 max-w-5xl relative border border-gray-200 dark:border-gray-700" style={{ maxHeight: "90vh", overflowY: "auto" }}>
        {/* Header */}
        <div className="flex justify-between items-center mb-6 md:mb-8 border-b border-gray-200 dark:border-gray-700 pb-4">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
            Magic Link History
          </h2>
          <button
            onClick={onClose}
            className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6 md:mb-8">
          <div className="flex flex-col md:flex-row gap-4 flex-1">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search by email"
                className="w-full h-10 md:h-11 px-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={filterEmail}
                onChange={(e) => setFilterEmail(e.target.value)}
              />
            </div>
            <div className="flex-1">
              <Select
                value={filterStatus || "all"}
                onValueChange={(value) => setFilterStatus(value === "all" ? "" : value)}
              >
                <SelectTrigger className="h-10 md:h-11 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="expired">Expired</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button
            onClick={clearFilters}
            className="h-10 md:h-11 bg-black hover:bg-gray-800 text-white font-medium rounded-lg w-full md:w-32"
          >
            Clear Filters
          </Button>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto">
          {paginatedLinks.length > 0 ? (
            <div className="rounded-lg border border-gray-200 dark:border-gray-700">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50 dark:bg-gray-800">
                    <TableHead className="font-semibold text-gray-700 dark:text-gray-200 text-sm md:text-base whitespace-nowrap w-1/3">Email</TableHead>
                    <TableHead className="font-semibold text-gray-700 dark:text-gray-200 text-sm md:text-base whitespace-nowrap">Created At</TableHead>
                    <TableHead className="font-semibold text-gray-700 dark:text-gray-200 text-sm md:text-base whitespace-nowrap">Expiration</TableHead>
                    <TableHead className="font-semibold text-gray-700 dark:text-gray-200 text-sm md:text-base">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedLinks.map((link) => {
                    const isExpired = new Date(link.expires_at) < new Date();
                    return (
                      <TableRow key={link.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                        <TableCell className="font-medium text-sm md:text-base truncate max-w-[200px] md:max-w-[300px]">
                          {link.email}
                        </TableCell>
                        <TableCell className="text-sm md:text-base whitespace-nowrap">{new Date(link.created_at).toLocaleString()}</TableCell>
                        <TableCell className="text-sm md:text-base whitespace-nowrap">{new Date(link.expires_at).toLocaleString()}</TableCell>
                        <TableCell>
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs md:text-sm font-medium ${
                              isExpired
                                ? "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300"
                                : "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300"
                            }`}
                          >
                            {isExpired ? "Expired" : "Active"}
                          </span>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-8 md:py-12 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-dashed border-gray-300 dark:border-gray-700">
              <svg className="mx-auto h-10 w-10 md:h-12 md:w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V7a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-200">No magic links found</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>

        {/* Pagination with First/Last buttons */}
        {totalPages > 0 && (
          <div className="mt-6 flex justify-center">
            <Pagination>
              <PaginationContent className="flex flex-wrap justify-center gap-1">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => goToPage(1)}
                  disabled={currentPage === 1}
                  className="hidden md:block px-3 text-sm"
                >
                  First
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-2 md:px-3 py-1 md:py-2 text-sm"
                >
                  Previous
                </Button>
                
                {generatePaginationRange().map((page, index) => (
                  <PaginationItem key={index}>
                    {page === '...' ? (
                      <span className="px-3 py-2">...</span>
                    ) : (
                      <PaginationLink
                        className={`px-2 md:px-3 py-1 md:py-2 text-sm ${
                          currentPage === page
                            ? "bg-blue-600 text-white hover:bg-blue-700"
                            : "hover:bg-gray-100 dark:hover:bg-gray-800"
                        }`}
                        onClick={() => goToPage(page)}
                      >
                        {page}
                      </PaginationLink>
                    )}
                  </PaginationItem>
                ))}

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-2 md:px-3 py-1 md:py-2 text-sm"
                >
                  Next
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => goToPage(totalPages)}
                  disabled={currentPage === totalPages}
                  className="hidden md:block px-3 text-sm"
                >
                  Last
                </Button>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </div>
  );
};

export default MagicLinkHistoryPopup;