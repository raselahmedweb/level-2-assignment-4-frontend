import { Link } from "react-router";
import { ModeToggle } from "../mode-toggle";

function Navbar() {
  return (
    <nav className="flex items-center py-3">
      <Link to="/" className="text-green-500 text-2xl font-bold mr-3">
        TaskManger
      </Link>
      <ul className="flex items-center gap-3">
        <li>
          <Link to="/tasks">Tasks</Link>
        </li>
        <li>
          <Link to="/users">Users</Link>
        </li>
      </ul>
      <div className="ml-auto">
        <ModeToggle />
      </div>
    </nav>
  );
}

export default Navbar;
