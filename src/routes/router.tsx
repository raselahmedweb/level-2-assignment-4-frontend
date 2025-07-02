import App from "@/App";
import TaskCard from "@/pages/Task";
import Users from "@/pages/Users";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        path: "/",
        Component: TaskCard,
      },
      {
        path: "/tasks",
        Component: TaskCard,
      },
      {
        path: "users",
        Component: Users,
      },
    ],
  },
]);
