import { Book, XCircle } from "lucide-react";
import { useGetBookQuery } from "@/redux/api/baseApi";
import { Badge } from "@/components/ui/badge";
import BorrowBook from "@/components/BorrowBook";
import type { IBook } from "@/types";
import { Button } from "./ui/button";
import { useNavigate } from "react-router";

export default function SuggestedBooks() {
  const navigate = useNavigate();
  const { data } = useGetBookQuery(
    {
      filter: "",
      limit: 6,
      skip: 0,
    },
    {
      pollingInterval: 30000,
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
    }
  );
  return (
    <div className="flex flex-col space-y-3">
      <h2 className="mr-auto text-2xl font-bold text-start">Explore books</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {data &&
          data.data &&
          data.data.map((book: IBook, idx: number) => (
            <div
              key={idx}
              className="flex flex-col items-start w-full border p-4 rounded-lg gap-4"
            >
              {/* Book Image */}
              <div className="flex justify-start">
                <div className="overflow-hidden border-0 w-max-md w-20 h-20 py-0">
                  {book.imageUrl ? (
                    <img
                      src={book.imageUrl || "/placeholder.svg"}
                      alt={book.title}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <div className="w-full aspect-[3/4] bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center rounded-lg">
                      <Book className="h-24 w-24 text-gray-400" />
                    </div>
                  )}
                </div>
              </div>

              {/* Book Details */}
              <div className="space-y-3">
                <div>
                  <h1 className="text-xl font-bold text-gray-900 dark:text-gray-300 mb-2">
                    {book.title}
                  </h1>
                  <p className="text-xl text-gray-600 mb-4">by {book.author}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="secondary" className="text-sm">
                      {book.genre}
                    </Badge>
                  </div>
                </div>

                {/* Borrow Button */}

                <div className="flex gap-2">
                  {book.copies > 0 && book.available ? (
                    <BorrowBook book={book._id} available={true} />
                  ) : (
                    <Button size="lg" variant="outline" disabled>
                      <XCircle className="w-4 h-4 mr-2" />
                      Currently Unavailable
                    </Button>
                  )}
                  <Button onClick={() => navigate(`/books/${book._id}`)}>
                    View
                  </Button>
                </div>
              </div>
            </div>
          ))}
      </div>
      <Button variant="outline" onClick={() => navigate("/books")}>
        View all book
      </Button>
    </div>
  );
}
