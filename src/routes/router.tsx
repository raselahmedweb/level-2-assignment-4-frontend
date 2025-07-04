import App from "@/App";
import AllBooks from "@/pages/AllBook";
import CreateBook from "@/pages/CreateBook";
import Home from "@/pages/Home";
import SingleBook from "@/pages/SingleBook";
import UpdateBook from "@/pages/UpdateBook";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        path: "/",
        Component: Home,
      },
      {
        path: "books",
        Component: AllBooks,
      },
      {
        path: "create-book",
        Component: CreateBook,
      },
      {
        path: "borrow-summary",
        element: (
          <div>
            <h1>Borrow summary</h1>
          </div>
        ),
      },
      {
        path: "books/:id",
        Component: SingleBook,
      },
      {
        path: "edit-book/:id",
        Component: UpdateBook,
      },
      {
        path: "borrow/:bookId",
        element: (
          <div>
            <h1>borrow a book</h1>
          </div>
        ),
      },
    ],
  },
]);
