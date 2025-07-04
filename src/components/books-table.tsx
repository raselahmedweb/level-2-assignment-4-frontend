import { Bounce, toast } from "react-toastify";
import Swal from "sweetalert2";
import { useDeleteBookMutation, useGetBookQuery } from "@/redux/api/baseApi";
import { Button } from "./ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { useNavigate } from "react-router";
import type { IBook } from "@/types";
import { Card } from "./ui/card";
import { XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import Pagination from "./ui/pagination";

export default function BookTable(props: { items: number }) {
  const navigate = useNavigate();
  // pagination
  const itemsPerPage = props.items || 6;
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, isError } = useGetBookQuery(
    {
      filter: "",
      limit: itemsPerPage,
      skip: (currentPage - 1) * itemsPerPage,
    },
    {
      pollingInterval: 30000,
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
    }
  );

  useEffect(() => {
    if (data && data.totalBooks) {
      setTotalPages(Math.ceil(data.totalBooks / itemsPerPage));
    }
  }, [data, itemsPerPage]);

  const [deleteBook] = useDeleteBookMutation();

  const handleDelete = async (id: string) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await deleteBook(id).unwrap();
          toast.success(res.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            transition: Bounce,
          });
        }
      });
    } catch (error) {
      console.log(error, "error from delete book function");
      toast.error("Failed to delete book");
    }
  };
  if (isLoading) {
    return (
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
    );
  }
  if (isError) {
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
    <>
      <div
        className={
          data.totalBooks > 11 && props.items > 6
            ? "hidden md:flex justify-between items-center"
            : "hidden"
        }
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900">All Books</h1>
        </div>

        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onHandleCurrentPage={setCurrentPage}
        />
      </div>
      <div className="hidden md:block mb-2">
        <Table className="text-center">
          {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
          <TableHeader className="bg-green-300 dark:bg-green-500 text-black text-center">
            <TableRow>
              <TableHead className="text-black">Title</TableHead>
              <TableHead className="text-black">Author</TableHead>
              <TableHead className="text-black">Genre</TableHead>
              <TableHead className="text-black">ISBN</TableHead>
              <TableHead className="text-black">Copies</TableHead>
              <TableHead className="text-black">Availability</TableHead>
              <TableHead className="text-black">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data &&
              data.data &&
              data.data.map((book: IBook, index: number) => {
                return (
                  <TableRow key={index}>
                    <TableCell>{book.title}</TableCell>
                    <TableCell>{book.author}</TableCell>
                    <TableCell>{book.genre}</TableCell>
                    <TableCell>{book.isbn}</TableCell>
                    <TableCell>{book.copies}</TableCell>
                    <TableCell>
                      {book.available ? "Available" : "Not Available"}
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={() => navigate(`/books/${book._id}`)}
                        variant="outline"
                        className="mr-2"
                      >
                        View
                      </Button>
                      <Button
                        onClick={() => navigate(`/edit-book/${book._id}`)}
                        className="mr-2"
                      >
                        Edit
                      </Button>
                      <Button
                        disabled={!book.available}
                        variant={book.available ? "outline" : "secondary"}
                        onClick={() => navigate(`/borrow/${book._id}`)}
                        className="mr-2"
                      >
                        Borrow
                      </Button>
                      <Button
                        onClick={() => handleDelete(book._id)}
                        variant="destructive"
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </div>
      <div className="md:hidden mb-2">
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onHandleCurrentPage={setCurrentPage}
        />
      </div>
      <div className="md:hidden mb-2">
        <div className="flex flex-wrap justify-center sm:justify-between items-center">
          {data && data.data.length === 0 ? (
            <p className="text-center">No books available</p>
          ) : (
            data.data.map((book: IBook, index: number) => {
              return (
                <div
                  key={index}
                  className="border w-full mb-3 sm:w-[325px] p-3 rounded-md"
                >
                  <h3 className="font-bold">{book.title}</h3>
                  <p>Author: {book.author}</p>
                  <p>Genre: {book.genre}</p>
                  <p>ISBN: {book.isbn}</p>
                  <p>Copies: {book.copies}</p>
                  <p>
                    Availability:{" "}
                    {book.available ? "Available" : "Not Available"}
                  </p>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => navigate(`/books/${book._id}`)}
                      variant="outline"
                    >
                      View
                    </Button>
                    <Button onClick={() => navigate(`/edit-book/${book._id}`)}>
                      Edit
                    </Button>
                    <Button
                      disabled={!book.available}
                      variant={book.available ? "outline" : "secondary"}
                      onClick={() => navigate(`/borrow/${book._id}`)}
                    >
                      Borrow
                    </Button>
                    <Button
                      onClick={() => handleDelete(book._id)}
                      variant="destructive"
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
      {/* Pagination */}
      <div>
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onHandleCurrentPage={setCurrentPage}
        />
      </div>
    </>
  );
}
