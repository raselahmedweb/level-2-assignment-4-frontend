"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetBookQuery } from "@/redux/api/baseApi";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Eye,
  Book,
  CheckCircle,
  XCircle,
} from "lucide-react";
import type { IBook } from "@/types";
import { Link } from "react-router";

export default function AllBooks() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchFilter, setSearchFilter] = useState("");
  const itemsPerPage = 5;

  const { data, isLoading, error } = useGetBookQuery(
    {
      filter: searchFilter,
      limit: itemsPerPage,
      skip: (currentPage - 1) * itemsPerPage,
    },
    {
      pollingInterval: 30000,
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
    }
  );

  const books: IBook[] = data?.data || [];
  const totalBooks = data?.total || 0;
  const totalPages = Math.ceil(totalBooks / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (value: string) => {
    setSearchFilter(value);
    setCurrentPage(1); // Reset to first page when searching
  };

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="p-8 text-center">
          <div className="flex flex-col items-center space-y-4">
            <XCircle className="h-16 w-16 text-red-500" />
            <h2 className="text-2xl font-bold text-gray-900">
              Error Loading Books
            </h2>
            <p className="text-gray-600">
              There was an error loading the book list. Please try again.
            </p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">All Books</h1>
            <p className="text-gray-600 mt-1">
              {totalBooks} {totalBooks === 1 ? "book" : "books"} available
            </p>
          </div>

          {/* Search */}
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search books..."
              value={searchFilter}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Table */}
        <Card>
          {isLoading ? (
            <div className="p-8">
              <div className="animate-pulse space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex space-x-4">
                    <div className="h-4 bg-gray-200 rounded flex-1"></div>
                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                    <div className="h-4 bg-gray-200 rounded w-20"></div>
                    <div className="h-4 bg-gray-200 rounded w-16"></div>
                  </div>
                ))}
              </div>
            </div>
          ) : books.length === 0 ? (
            <div className="p-8 text-center">
              <Book className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No Books Found
              </h3>
              <p className="text-gray-600">
                {searchFilter
                  ? "No books match your search criteria."
                  : "No books available at the moment."}
              </p>
            </div>
          ) : (
            <>
              {/* Desktop Table */}
              <div className="hidden md:block">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Author</TableHead>
                      <TableHead>Genre</TableHead>
                      <TableHead>Copies</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {books.map((book, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">
                          <div className="flex items-center space-x-3">
                            {book.imageUrl ? (
                              <img
                                src={book.imageUrl || "/placeholder.svg"}
                                alt={book.title}
                                className="w-10 h-12 object-cover rounded"
                              />
                            ) : (
                              <div className="w-10 h-12 bg-gray-200 rounded flex items-center justify-center">
                                <Book className="h-4 w-4 text-gray-400" />
                              </div>
                            )}
                            <div>
                              <p className="font-semibold">{book.title}</p>
                              <p className="text-sm text-gray-500">
                                ISBN: {book.isbn}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{book.author}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">{book.genre}</Badge>
                        </TableCell>
                        <TableCell>
                          <span
                            className={
                              book.copies === 0
                                ? "text-red-600 font-semibold"
                                : ""
                            }
                          >
                            {book.copies}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              book.available && book.copies > 0
                                ? "default"
                                : "destructive"
                            }
                          >
                            {book.available && book.copies > 0 ? (
                              <>
                                <CheckCircle className="w-3 h-3 mr-1" />{" "}
                                Available
                              </>
                            ) : (
                              <>
                                <XCircle className="w-3 h-3 mr-1" /> Unavailable
                              </>
                            )}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Link to={`/books/${book._id}`}>
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4 mr-1" />
                              View
                            </Button>
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Mobile Cards */}
              <div className="md:hidden space-y-4 p-4">
                {books.map((book) => (
                  <Card key={book._id} className="p-4">
                    <div className="flex space-x-4">
                      {book.imageUrl ? (
                        <img
                          src={book.imageUrl || "/placeholder.svg"}
                          alt={book.title}
                          className="w-16 h-20 object-cover rounded flex-shrink-0"
                        />
                      ) : (
                        <div className="w-16 h-20 bg-gray-200 rounded flex items-center justify-center flex-shrink-0">
                          <Book className="h-6 w-6 text-gray-400" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-lg truncate">
                          {book.title}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          by {book.author}
                        </p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <Badge variant="secondary" className="text-xs">
                            {book.genre}
                          </Badge>
                          <Badge
                            variant={
                              book.available && book.copies > 0
                                ? "default"
                                : "destructive"
                            }
                            className="text-xs"
                          >
                            {book.available && book.copies > 0
                              ? "Available"
                              : "Unavailable"}
                          </Badge>
                        </div>
                        <div className="flex justify-between items-center mt-3">
                          <span className="text-sm text-gray-600">
                            {book.copies}{" "}
                            {book.copies === 1 ? "copy" : "copies"}
                          </span>
                          <Link to={`/books/${book._id}`}>
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4 mr-1" />
                              View
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-end space-x-2 p-4 border-t">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <span>
                      Page {currentPage} of {totalPages}
                    </span>
                    <span>•</span>
                    <span>
                      {totalBooks} total {totalBooks === 1 ? "book" : "books"}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Previous
                    </Button>

                    {/* Page Numbers */}
                    <div className="hidden sm:flex items-center space-x-1">
                      {[...Array(Math.min(5, totalPages))].map((_, i) => {
                        let pageNum;
                        if (totalPages <= 5) {
                          pageNum = i + 1;
                        } else if (currentPage <= 3) {
                          pageNum = i + 1;
                        } else if (currentPage >= totalPages - 2) {
                          pageNum = totalPages - 4 + i;
                        } else {
                          pageNum = currentPage - 2 + i;
                        }

                        return (
                          <Button
                            key={pageNum}
                            variant={
                              currentPage === pageNum ? "default" : "outline"
                            }
                            size="sm"
                            onClick={() => handlePageChange(pageNum)}
                            className="w-8 h-8 p-0"
                          >
                            {pageNum}
                          </Button>
                        );
                      })}
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      Next
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </Card>
      </div>
    </div>
  );
}
