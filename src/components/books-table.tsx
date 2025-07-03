import { useGetBookQuery } from "@/redux/api/baseApi";
import { Button } from "./ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { useNavigate } from "react-router";

export default function BookTable() {
  const navigate = useNavigate();
  const { data } = useGetBookQuery(undefined);
  return (
    <Table className="text-center">
      <TableCaption>A list of your recent invoices.</TableCaption>
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
                <TableCell>{book.available ? "True" : "False"}</TableCell>
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
                    onClick={() => navigate(`/borrow/${book._id}`)}
                    className="mr-2"
                  >
                    Borrow
                  </Button>
                  <Button variant="destructive">Delete</Button>
                </TableCell>
              </TableRow>
            );
          })}
      </TableBody>
    </Table>
  );
}
