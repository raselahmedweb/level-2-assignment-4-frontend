import TaskControl from "@/components/task-control";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

import type { ITask } from "@/types";
import { format } from "date-fns";

import { CalendarIcon, PenIcon, Trash2Icon } from "lucide-react";
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

  // const onEdit: SubmitHandler<FieldValues> = (data) => {
  //   dispatch(
  //     updateTask({
  //       ...(data as ITask),
  //       id: editTask?.id || "",
  //       dueDate: data.dueDate?.toISOString(),
  //     })
  //   );
  // };
  const books = [];

  return (
    <>
      <TaskControl />
      {books.map((task, idx) => {
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
      })}
    </>
  );
}
