import SuggestedBooks from "@/components/SuggestedBooks";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useCreateBookMutation } from "@/redux/api/baseApi";
import type { ApiError, IBook } from "@/types";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";
import { Bounce, toast } from "react-toastify";

export default function CreateBook() {
  const navigate = useNavigate();
  const form = useForm();

  const [createBook, { isError, error }] = useCreateBookMutation();
  if (isError) {
    const getErrorMessage = (error: unknown): string => {
      if (error && typeof error === "object" && "data" in error) {
        const apiError = error as ApiError;
        const errors = apiError.data?.error?.errors;
        if (errors) {
          const firstField = Object.keys(errors)[0];
          return errors[firstField]?.message || "Something went wrong";
        }
      }
      return "Something went wrong. Please try again.";
    };
    toast.error(getErrorMessage(error));
  }

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const bookData = {
      ...(data as IBook),
      available: true,
      copies: Number(data.copies),
    };
    const res = await createBook(bookData).unwrap();
    toast.success(res.message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      transition: Bounce,
    });
    form.reset();
    navigate("/books");
  };

  return (
    <div className="flex flex-col gap-8 justify-start items-center mt-4 px-4 md:px-8">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 mx-auto w-full md:w-[500px] bg-green-50 dark:bg-green-950 rounded-md p-5"
        >
          <h2 className="text-xl font-bold">Create a book</h2>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Title"
                    {...field}
                    defaultValue={field.value || ""}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Author</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Author"
                    {...field}
                    defaultValue={field.value || ""}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Description"
                    {...field}
                    defaultValue={field.value || ""}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isbn"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ISBN</FormLabel>
                <FormControl>
                  <Input
                    placeholder="ISBN"
                    {...field}
                    defaultValue={field.value || ""}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="genre"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Genre</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value || ""}
                >
                  <FormControl className="w-full">
                    <SelectTrigger>
                      <SelectValue placeholder="Select genre" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="FICTION">FICTION</SelectItem>
                    <SelectItem value="NON_FICTION">NON_FICTION</SelectItem>
                    <SelectItem value="SCIENCE">SCIENCE</SelectItem>
                    <SelectItem value="HISTORY">HISTORY</SelectItem>
                    <SelectItem value="BIOGRAPHY">BIOGRAPHY</SelectItem>
                    <SelectItem value="FANTASY">FANTASY</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="copies"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Copies</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Copies"
                    {...field}
                    defaultValue={field.value || ""}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Image Url <span className="text-muted">(optional)</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Image Url"
                    {...field}
                    defaultValue={field.value || ""}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit">Create</Button>
        </form>
      </Form>
      <SuggestedBooks />
    </div>
  );
}
