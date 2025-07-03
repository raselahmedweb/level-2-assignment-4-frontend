import { Link, useLocation } from "react-router";
import { ModeToggle } from "../mode-toggle";
import { BookIcon, MenuIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { useState } from "react";

function Navbar() {
  const [dropdown, setDropdown] = useState(false);
  const { pathname } = useLocation();
  return (
    <>
      <nav className="py-2 border-b border-b-gray-300 dark:border-b-gray-900">
        <div className="flex items-center mx-4 md:mx-8">
          <Link
            to="/"
            className="text-green-500 text-2xl font-bold mr-3 flex items-center"
          >
            Library 📚
          </Link>
          <Button
            onClick={() => setDropdown((p) => !p)}
            className="md:hidden ml-auto"
          >
            <MenuIcon />
          </Button>
          <div className="md:hidden ms-3">
            <ModeToggle />
          </div>
          <ul className="items-center gap-5 hidden md:flex ml-auto">
            <li
              className={cn(
                "rounded px-3 py-2 hover:text-primary-foreground hover:bg-green-500",
                pathname.startsWith("/books") &&
                  "bg-green-500 text-primary-foreground shadow-xs hover:bg-primary/90"
              )}
            >
              <Link to="/books">All Book</Link>
            </li>
            <li
              className={cn(
                "rounded px-3 py-2 hover:text-primary-foreground hover:bg-green-500",
                pathname.startsWith("/create-book") &&
                  "bg-green-500 text-primary-foreground shadow-xs hover:bg-primary/90"
              )}
            >
              <Link to="/create-book">Add Book</Link>
            </li>
            <li
              className={cn(
                "rounded px-3 py-2 hover:text-primary-foreground hover:bg-green-500",
                pathname.startsWith("/borrow-summary") &&
                  "bg-green-500 text-primary-foreground shadow-xs hover:bg-primary/90"
              )}
            >
              <Link to="/borrow-summary">Borrow Summary</Link>
            </li>
            <li>
              <ModeToggle />
            </li>
          </ul>
        </div>
      </nav>
      {dropdown && (
        <ul className="items-center justify-center gap-8 row md:hidden mx-4 md:mx-8">
          <li
            onClick={() => setDropdown((p) => !p)}
            className={cn(
              "rounded px-3 py-2 hover:text-primary-foreground hover:bg-green-500",
              pathname.startsWith("/books") &&
                "bg-green-500 text-primary-foreground shadow-xs hover:bg-primary/90"
            )}
          >
            <Link to="/books">All Book</Link>
          </li>
          <li
            onClick={() => setDropdown((p) => !p)}
            className={cn(
              "rounded px-3 py-2 hover:text-primary-foreground hover:bg-green-500",
              pathname.startsWith("/create-book") &&
                "bg-green-500 text-primary-foreground shadow-xs hover:bg-primary/90"
            )}
          >
            <Link to="/create-book">Add Book</Link>
          </li>
          <li
            onClick={() => setDropdown((p) => !p)}
            className={cn(
              "rounded px-3 py-2 hover:text-primary-foreground hover:bg-green-500",
              pathname.startsWith("/borrow-summary") &&
                "bg-green-500 text-primary-foreground shadow-xs hover:bg-primary/90"
            )}
          >
            <Link to="/borrow-summary">Borrow Summary</Link>
          </li>
        </ul>
      )}
    </>
  );
}

export default Navbar;
