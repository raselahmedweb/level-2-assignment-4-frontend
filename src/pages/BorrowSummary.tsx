"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useGetBorrowedBooksSummaryQuery } from "@/redux/api/baseApi";
import { Book, BarChart3 } from "lucide-react";
import SuggestedBooks from "@/components/SuggestedBooks";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { BorrowedBookSummary } from "@/types";

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
            <div className="hidden md:block mx-auto max-w-3xl w-full">
              <Accordion
                type="single"
                collapsible
                className="w-full"
                defaultValue={"0"}
              >
                {[...borrowedBooks]
                  .sort((a, b) => b.totalQuantity - a.totalQuantity)
                  .map((item, idx) => (
                    <AccordionItem key={item.book.isbn} value={idx.toString()}>
                      <AccordionTrigger>
                        <div className="flex items-center justify-between">
                          <h2 className="text-lg font-semibold">
                            {item.book.title}
                          </h2>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="flex flex-col gap-4 text-balance">
                        <div className="flex flex-col gap-2">
                          <div
                            key={item.book.isbn}
                            className="flex flex-col gap-3"
                          >
                            <span className="text-sm">
                              ISBN :{" "}
                              <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm">
                                {item.book.isbn}
                              </code>
                            </span>
                            <span className="text-sm text-gray-500">
                              {item.totalQuantity} borrowed
                            </span>
                            <a
                              href={`/books/${item.book.id}`}
                              className="rounded text-center px-3 py-1 bg-green-50 dark:bg-gray-600 shadow w-30"
                            >
                              View Book
                            </a>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
              </Accordion>
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
                          <a
                            href={`/books/${item.book.id}`}
                            className="rounded mt-3 block text-center px-3 py-1 bg-green-50 dark:bg-gray-950 shadow w-30"
                          >
                            View Book
                          </a>
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
