import App from "@/App";
import CreateBook from "@/pages/CreateBook";
import Home from "@/pages/Home";
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
        element: (
          <div>
            <h1>All Books</h1>
          </div>
        ),
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
        element: (
          <div>
            <h1>Single book</h1>
          </div>
        ),
      },
      {
        path: "edit-book/:id",
        element: (
          <div>
            <h1>Edit book</h1>
          </div>
        ),
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
