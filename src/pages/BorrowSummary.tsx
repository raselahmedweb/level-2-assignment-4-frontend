"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetBorrowedBooksSummaryQuery } from "@/redux/api/baseApi";
import { Book, BarChart3 } from "lucide-react";
import SuggestedBooks from "@/components/SuggestedBooks";

interface BorrowedBookSummary {
  book: {
    title: string;
    isbn: string;
  };
  totalQuantity: number;
}

export default function BorrowedBooksSummary() {
  const { data, isLoading, error } = useGetBorrowedBooksSummaryQuery(
    undefined,
    {
      pollingInterval: 30000,
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
    }
  );

  const borrowedBooks: BorrowedBookSummary[] = data?.data || [];

  if (isLoading) {
    return (
      <div className="px-4 md:px-8 mt-4">
        <div className="space-y-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-64 mb-2"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-48"></div>
          </div>

          <div className="animate-pulse">
            <div className="bg-gray-200 dark:bg-gray-700 h-64 rounded-lg"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-4 md:px-8 mt-4">
        <Card className="p-8 text-center">
          <div className="flex flex-col items-center space-y-4">
            <BarChart3 className="h-16 w-16 text-red-500" />
            <h2 className="text-2xl font-bold text-gray-900">
              Error Loading Summary
            </h2>
            <p className="text-gray-600">
              There was an error loading the borrowed books summary. Please try
              again.
            </p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="px-4 md:px-8 mt-4">
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Borrowed Books Summary</h1>
          <p className="mt-1">
            Overview of all borrowed books and their quantities
          </p>
        </div>

        {/* Borrowed Books Table */}
        {borrowedBooks.length === 0 ? (
          <div className="text-center py-8">
            <Book className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No Borrowed Books
            </h3>
            <p className="text-gray-600">No books have been borrowed yet.</p>
          </div>
        ) : (
          <>
            <div className="hidden md:block">
              <Table className="text-center">
                <TableHeader className="bg-green-300 dark:bg-green-500 text-black text-center">
                  <TableRow>
                    <TableHead>Book Title</TableHead>
                    <TableHead>ISBN</TableHead>
                    <TableHead className="text-center">
                      Total Quantity
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="text-center">
                  {[...borrowedBooks]
                    .sort((a, b) => b.totalQuantity - a.totalQuantity)
                    .map((item) => (
                      <TableRow key={item.book.isbn}>
                        <TableCell className="font-medium">
                          {item.book.title}
                        </TableCell>
                        <TableCell>
                          <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm">
                            {item.book.isbn}
                          </code>
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge variant="secondary" className="font-semibold">
                            {item.totalQuantity}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>

            <div className="md:hidden space-y-4">
              {[...borrowedBooks]
                .sort((a, b) => b.totalQuantity - a.totalQuantity)
                .map((item) => (
                  <Card key={item.book.isbn} className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3 flex-1">
                        <div className="min-w-0 flex-1">
                          <h3 className="font-semibold text-lg truncate">
                            {item.book.title}
                          </h3>
                          <p className="text-sm text-gray-600 mb-2">
                            ISBN: {item.book.isbn}
                          </p>
                          <div className="flex items-center space-x-4">
                            <Badge
                              variant="secondary"
                              className="font-semibold"
                            >
                              {item.totalQuantity} borrowed
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
            </div>
          </>
        )}
        <SuggestedBooks />
      </div>
    </div>
  );
}
