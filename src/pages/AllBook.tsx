import BookTable from "@/components/books-table";

export default function AllBook() {
  return (
    <div className="px-4 md:px-8 flex flex-col py-4 gap-3">
      <BookTable items={15} />
    </div>
  );
}
