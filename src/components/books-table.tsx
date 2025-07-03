import { Bounce, toast } from "react-toastify";
import Swal from "sweetalert2";
import { useDeleteBookMutation, useGetBookQuery } from "@/redux/api/baseApi";
import { Button } from "./ui/button";
import {
  Table,
  TableBody,
  // TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { useNavigate } from "react-router";

export default function BookTable() {
  const navigate = useNavigate();
  const { data } = useGetBookQuery(undefined, {
    pollingInterval: 30000,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

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
          console.log(res, "response from delete book function");
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
  return (
    <div>
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
            data.data.map((book) => {
              return (
                <TableRow>
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
  );
}
