import { Link, useLocation } from "react-router";
import { ModeToggle } from "../mode-toggle";
import { MenuIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { useState } from "react";

function Navbar() {
  const [dropdown, setDropdown] = useState(false);
  const { pathname } = useLocation();
  return (
    <>
      <nav className="py-2 bg-green-50 dark:bg-gray-900 border-b border-b-gray-300 dark:border-b-gray-900">
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
            <li>
              <Link
                className={cn(
                  " px-3 py-2  hover:bg-green-500/10 hover:border hover:border-green-600",
                  pathname.startsWith("/books") &&
                    "bg-green-500/10  shadow-xs border border-green-600 "
                )}
                to="/books"
              >
                All Book
              </Link>
            </li>
            <li>
              <Link
                className={cn(
                  " px-3 py-2  hover:bg-green-500/10 hover:border hover:border-green-600",
                  pathname.startsWith("/create-book") &&
                    "bg-green-500/10  shadow-xs border border-green-600 "
                )}
                to="/create-book"
              >
                Add Book
              </Link>
            </li>
            <li>
              <Link
                className={cn(
                  " px-3 py-2  hover:bg-green-500/10 hover:border hover:border-green-600",
                  pathname.startsWith("/borrow-summary") &&
                    "bg-green-500/10  shadow-xs border border-green-600 "
                )}
                to="/borrow-summary"
              >
                Borrow Summary
              </Link>
            </li>
            <li>
              <ModeToggle />
            </li>
          </ul>
        </div>
      </nav>
      {dropdown && (
        <ul className="items-center flex flex-col py-5 justify-center gap-8 row md:hidden mx-4 md:mx-8">
          <li onClick={() => setDropdown((p) => !p)}>
            <Link
              className={cn(
                " px-3 py-2 hover:bg-green-500/10 hover:border hover:border-green-600",
                pathname.startsWith("/books") &&
                  "bg-green-500/10  shadow-xs border border-green-600 "
              )}
              to="/books"
            >
              All Book
            </Link>
          </li>
          <li onClick={() => setDropdown((p) => !p)}>
            <Link
              className={cn(
                " px-3 py-2  hover:bg-green-500/10 hover:border hover:border-green-600",
                pathname.startsWith("/create-book") &&
                  "bg-green-500/10  shadow-xs border border-green-600 "
              )}
              to="/create-book"
            >
              Add Book
            </Link>
          </li>
          <li onClick={() => setDropdown((p) => !p)}>
            <Link
              className={cn(
                " px-3 py-2  hover:bg-green-500/10 hover:border hover:border-green-600",
                pathname.startsWith("/borrow-summary") &&
                  "bg-green-500/10  shadow-xs border border-green-600 "
              )}
              to="/borrow-summary"
            >
              Borrow Summary
            </Link>
          </li>
        </ul>
      )}
    </>
  );
}

export default Navbar;
