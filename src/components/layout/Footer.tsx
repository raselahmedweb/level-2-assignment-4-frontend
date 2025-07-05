import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-green-50 dark:bg-gray-900 px-4 md:px-8 mt-4 pt-8">
      <div className="flex flex-col sm:text-center md:text-start sm:items-center md:flex-row md:justify-between gap-8">
        {/* About Us */}
        <div className="w-72">
          <h3 className="text-lg font-semibold mb-4">About</h3>
          <p className="  leading-relaxed">
            Explore and manage a collection of books. View books, add new book,
            update book details, delete book, and borrow book. All in one simple
            interface.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className=" hover: transition-colors ">
                Home
              </Link>
            </li>
            <li>
              <Link to="/" className=" hover: transition-colors ">
                All Books
              </Link>
            </li>
            <li>
              <Link to="/borrow-summary" className=" hover: transition-colors ">
                Borrow Summary
              </Link>
            </li>

            <li>
              <Link
                to="https://raseldev.com"
                className=" hover: transition-colors "
              >
                Portfolio
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Us */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <div className="space-y-2 ">
            <p className="">
              <span className="font-medium">Email:</span> itrasel75@gmail.com
            </p>
            <p className="">
              <span className="font-medium">Phone:</span> +966572746302
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-8 py-5 text-center">
        <p className="">
          © {new Date().getFullYear()} Library. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
