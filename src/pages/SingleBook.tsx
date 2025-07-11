import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useGetBookByIdQuery } from "@/redux/api/baseApi";
import { useNavigate, useParams } from "react-router";
import {
  Book,
  Users,
  Hash,
  CheckCircle,
  XCircle,
  ArrowLeftCircle,
} from "lucide-react";
import SuggestedBooks from "@/components/SuggestedBooks";
import BorrowBook from "@/components/BorrowBook";
import type { IBook } from "@/types";

export default function SingleBook() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isLoading, error } = useGetBookByIdQuery(id, {
    pollingInterval: 30000,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  const goBack = () => {
    navigate(-1);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-200 aspect-[3/4] rounded-lg"></div>
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 rounded"></div>
              <div className="h-6 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !data?.data) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="p-8 text-center">
          <div className="flex flex-col items-center space-y-4">
            <XCircle className="h-16 w-16 text-red-500" />
            <h2 className="text-2xl font-bold text-gray-900">Book Not Found</h2>
            <p className="text-gray-600">
              The book you're looking for doesn't exist or has been removed.
            </p>
          </div>
        </Card>
      </div>
    );
  }

  const book: IBook = data.data;

  return (
    <div className="mx-auto px-4 md:px-8 mb-10">
      <Button
        onClick={goBack}
        variant="link"
        className="text-green-500 hover:underline"
      >
        <ArrowLeftCircle />
      </Button>
      <div className="mb-5 flex flex-col md:flex-row justify-center items-start gap-4 md:gap-8 mx-auto">
        {/* Book Image */}
        <div className="flex justify-start">
          <div className="overflow-hidden border-0 w-max-md w-full h-auto py-0">
            {book.imageUrl ? (
              <img
                src={
                  book.imageUrl ||
                  "https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=_zOuJu755g2eEUioiOUdz_mHKJQJn-tDgIAhQzyeKUQ="
                }
                alt={book.title}
                className="w-full h-auto object-cover rounded-lg"
              />
            ) : (
              <div className="w-full aspect-[3/4] bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center rounded-lg">
                <Book className="h-24 w-24 text-gray-400" />
              </div>
            )}
          </div>
        </div>

        {/* Book Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-300 mb-2">
              {book.title}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-4">
              by {book.author}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="secondary" className="text-sm">
                {book.genre}
              </Badge>
              <Badge
                variant={book.available ? "default" : "destructive"}
                className="text-sm"
              >
                {book.available ? (
                  <>
                    <CheckCircle className="w-3 h-3 mr-1" /> Available
                  </>
                ) : (
                  <>
                    <XCircle className="w-3 h-3 mr-1" /> Unavailable
                  </>
                )}
              </Badge>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Hash className="h-5 w-5 text-gray-500 dark:text-gray-200" />
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-200">
                  ISBN
                </p>
                <p className="text-gray-900 dark:text-gray-100">{book.isbn}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Users className="h-5 w-5 text-gray-500 dark:text-gray-200" />
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-200">
                  Available Copies
                </p>
                <p className="text-gray-900 dark:text-gray-100 font-semibold">
                  {book.copies} {book.copies === 1 ? "copy" : "copies"}
                </p>
              </div>
            </div>
          </div>

          {book.description && (
            <>
              <Separator />
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Description
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {book.description}
                </p>
              </div>
            </>
          )}

          <Separator />

          {/* Borrow Button */}
          <div>
            {book.copies > 0 && book.available ? (
              <BorrowBook available={true} book={book._id} />
            ) : (
              <div className="text-center sm:text-left">
                <p className="text-gray-500 dark:text-gray-200 mb-2">
                  {book.copies === 0
                    ? "No copies available"
                    : "Book currently unavailable"}
                </p>
                <Button
                  size="lg"
                  variant="outline"
                  disabled
                  className="w-full sm:w-auto bg-transparent"
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  Currently Unavailable
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      <SuggestedBooks />
    </div>
  );
}
