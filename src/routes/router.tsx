import App from "@/App";
import Home from "@/pages/Home";
import Users from "@/pages/Users";
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
        path: "/books",
        element: <div>(<h1>Books) < /h1></div > ` `,
      },
      {
        path: "users",
        Component: Users,
      },
    ],
  },
]);
