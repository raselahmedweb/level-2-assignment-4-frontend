import { Link } from "react-router";
import { ModeToggle } from "../mode-toggle";
import { BookIcon } from "lucide-react";

function Navbar() {
  return (
    <nav className="flex items-center py-3">
      <Link
        to="/"
        className="text-amber-700 text-2xl font-bold mr-3 flex items-center"
      >
        Library <BookIcon />
      </Link>
      <ul className="flex items-center gap-3 ml-auto">
        <li>
          <Link to="/tasks">Tasks</Link>
        </li>
        <li>
          <Link to="/users">Users</Link>
        </li>
        <li>
          <ModeToggle />
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
