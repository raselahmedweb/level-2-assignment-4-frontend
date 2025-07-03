// import TaskControl from "@/components/task-control";
import BookTable from "@/components/books-table";
import { useGetBookQuery } from "@/redux/api/baseApi";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function Home() {
  const [editTask, setEditTask] = useState<ITask | null>(null);
  const editForm = useForm({
    defaultValues: {
      id: editTask?.id,
      title: editTask?.title || "",
      description: editTask?.description || "",
      dueDate: editTask?.dueDate ? new Date(editTask?.dueDate) : undefined,
      priority: editTask?.priority || "low",
      isCompleted: editTask?.isCompleted,
    },
  });
  useEffect(() => {
    if (editTask) {
      editForm.reset({
        id: editTask?.id,
        title: editTask.title || "",
        description: editTask.description || "",
        dueDate: editTask.dueDate ? new Date(editTask.dueDate) : undefined,
        priority: editTask.priority || "low",
        isCompleted: editTask?.isCompleted,
      });
    }
  }, [editTask, editForm]);
  const { data } = useGetBookQuery(undefined);
  console.log(data);

  return (
    <div>
      <div className="relative h-72">
        <div className="w-full h-full bg-black/80 absolute"></div>
        <div className="w-full h-full flex flex-col gap-3 text-white justify-center items-center absolute text-center">
          <h1 className="text-center text-xl md:text-3xl font-bold">
            Minimal Library Management System 📚
          </h1>
          <p className="max-w-[500px] text-gray-300">
            Explore and manage a collection of books. View books, add new book,
            update book details, delete book, and borrow book. All in one simple
            interface.
          </p>
        </div>
        <img
          className="w-full h-full"
          src="https://static.vecteezy.com/system/resources/thumbnails/047/205/629/small/a-blurred-view-of-a-public-library-interior-with-defocused-bookshelves-ideal-for-business-or-education-backgrounds-photo.jpg"
          alt="Library"
        />
      </div>
      <div className="mx-4 md:mx-8">
        <BookTable />
      </div>
      {/* <TaskControl /> */}
      {/* {books.map((task, idx) => {
        return (
          <div key={idx} className="border px-5 py-3 rounded-md mb-5">
            <div className="flex justify-between items-center">
              <Table>
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Invoice</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">INV001</TableCell>
                    <TableCell>Paid</TableCell>
                    <TableCell>Credit Card</TableCell>
                    <TableCell className="text-right">$250.00</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <div className="flex gap-1 items-center">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      onClick={() => setEditTask(task)}
                      className="p-0"
                      variant="link"
                    >
                      <PenIcon />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogTitle className="sr-only">Nothing</DialogTitle>
                    <DialogDescription className="sr-only">
                      This action cannot be undone. This will permanently delete
                      your account and remove your data from our servers.
                    </DialogDescription>
                    <Form {...editForm}>
                      <form
                        // onSubmit={editForm.handleSubmit(onEdit)}
                        className="space-y-8"
                      >
                        <FormField
                          control={editForm.control}
                          name="title"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Title</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Title"
                                  {...field}
                                  // defaultValue={editTask?.title || ""}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={editForm.control}
                          name="description"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Description</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Description"
                                  {...field}
                                  // defaultValue={editTask?.description || ""}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={editForm.control}
                          name="dueDate"
                          render={({ field }) => (
                            <FormItem className="flex flex-col">
                              <FormLabel>Due Date</FormLabel>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant={"outline"}
                                      className={cn(
                                        "pl-3 text-left font-normal",
                                        !field.value && "text-muted-foreground"
                                      )}
                                    >
                                      {field.value ? (
                                        format(field.value, "PPP")
                                      ) : (
                                        <span>Pick a date</span>
                                      )}
                                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent
                                  className="w-auto p-0"
                                  align="start"
                                >
                                  <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    // disabled={(date) => date < new Date("1900-01-01")}
                                    captionLayout="dropdown"
                                  />
                                </PopoverContent>
                              </Popover>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={editForm.control}
                          name="priority"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Priority</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                value={field.value}
                                // defaultValue={editTask?.priority || ""}
                              >
                                <FormControl className="w-full">
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select priority" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="low">Low</SelectItem>
                                  <SelectItem value="medium">Medium</SelectItem>
                                  <SelectItem value="high">High</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={editForm.control}
                          name="isCompleted"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Is Completed</FormLabel>
                              <Select
                                value={String(field.value)}
                                onValueChange={(val) =>
                                  field.onChange(val === "true")
                                }
                                // defaultValue={editTask?.priority || ""}
                              >
                                <FormControl className="w-full">
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select priority" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="true">True</SelectItem>
                                  <SelectItem value="false">False</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormItem>
                          )}
                        />
                        <Button type="submit">Edit Task</Button>
                      </form>
                    </Form>
                  </DialogContent>
                </Dialog>
                <Button
                  // onClick={() => dispatch(deleteTask(task.id))}
                  variant="link"
                  className="p-0 text-red-500"
                >
                  <Trash2Icon />
                </Button>

                <Checkbox
                  // onClick={() => dispatch(toggleCompleteState(task.id))}
                  checked={task.isCompleted}
                />
              </div>
            </div>
            <p className="mt-5">{task.description}</p>
          </div>
        );
      })} */}
    </div>
  );
}
