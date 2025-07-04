import BookTable from "@/components/books-table";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <div className="relative h-72">
        <div className="w-full h-full bg-black/80 absolute"></div>
        <div className="w-full px-4 h-full flex flex-col gap-3 text-white justify-center items-center absolute text-center">
          <h1 className="text-center text-xl md:text-3xl font-bold">
            Minimal Library Management System 📚
          </h1>
          <p className="max-w-[500px] text-gray-300">
            Explore and manage a collection of books. View books, add new book,
            update book details, delete book, and borrow book. All in one simple
            interface.
          </p>
        </div>
        <img
          className="w-full h-full"
          src="https://static.vecteezy.com/system/resources/thumbnails/047/205/629/small/a-blurred-view-of-a-public-library-interior-with-defocused-bookshelves-ideal-for-business-or-education-backgrounds-photo.jpg"
          alt="Library"
        />
      </div>
      <div className="flex justify-between items-center mx-4 md:mx-8 my-3">
        <h1
          className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-200"
          style={{ textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)" }}
        >
          Books
        </h1>
        <Button onClick={() => navigate("/create-book")}>Create Book</Button>
      </div>
      <div className="mx-4 md:mx-8">
        <BookTable items={6} />
      </div>
    </div>
  );
}
