// import { useAppDispatch, useAppSelector } from "@/redux/hooks";
// import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
// import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import type { ITask } from "@/types";
// import { addTask, filterTask } from "@/redux/features/task/taskSlice";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogTitle,
//   DialogTrigger,
// } from "./ui/dialog";
// import { Button } from "./ui/button";
// import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
// import { Input } from "./ui/input";
// import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
// import { cn } from "@/lib/utils";
// import { format } from "date-fns";
// import { CalendarIcon } from "lucide-react";
// import { Calendar } from "./ui/calendar";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "./ui/select";
// import { selectUsers } from "@/redux/features/user/userSlice";
// import { useState } from "react";
// import { Textarea } from "./ui/textarea";

// function TaskControl() {
//   const [open, setOpen] = useState(false);
//   const form = useForm();
//   const dispatch = useAppDispatch();
//   const onSubmit: SubmitHandler<FieldValues> = (data) => {
//     dispatch(
//       addTask({
//         ...(data as ITask),
//         dueDate: data.dueDate?.toISOString(),
//       })
//     );
//     form.reset();
//     setOpen(false);
//   };

//   const users = useAppSelector(selectUsers);
//   return (
//     <div className="flex justify-between my-5 gap-3">
//       <h3>Tasks</h3>

//       <div className="flex justify-end gap-3">
//         <Tabs defaultValue="all">
//           <TabsList>
//             <TabsTrigger
//               onClick={() => dispatch(filterTask("all"))}
//               value="all"
//             >
//               All
//             </TabsTrigger>
//             <TabsTrigger
//               onClick={() => dispatch(filterTask("low"))}
//               value="low"
//             >
//               Low
//             </TabsTrigger>
//             <TabsTrigger
//               onClick={() => dispatch(filterTask("medium"))}
//               value="medium"
//             >
//               Medium
//             </TabsTrigger>
//             <TabsTrigger
//               onClick={() => dispatch(filterTask("high"))}
//               value="high"
//             >
//               High
//             </TabsTrigger>
//           </TabsList>
//         </Tabs>

//         <Dialog open={open} onOpenChange={setOpen}>
//           <DialogTrigger asChild>
//             <Button variant="default">Add Task</Button>
//           </DialogTrigger>
//           <DialogContent className="sm:max-w-[425px]">
//             <DialogTitle className="sr-only">Nothing</DialogTitle>
//             <DialogDescription className="sr-only">
//               This action cannot be undone. This will permanently delete your
//               account and remove your data from our servers.
//             </DialogDescription>
//             <Form {...form}>
//               <form
//                 onSubmit={form.handleSubmit(onSubmit)}
//                 className="space-y-8"
//               >
//                 <FormField
//                   control={form.control}
//                   name="title"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Title</FormLabel>
//                       <FormControl>
//                         <Input
//                           placeholder="Title"
//                           {...field}
//                           value={field.value || ""}
//                         />
//                       </FormControl>
//                     </FormItem>
//                   )}
//                 />
//                 <FormField
//                   control={form.control}
//                   name="description"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Description</FormLabel>
//                       <FormControl>
//                         <Textarea
//                           placeholder="Description"
//                           {...field}
//                           value={field.value || ""}
//                         />
//                       </FormControl>
//                     </FormItem>
//                   )}
//                 />
//                 <FormField
//                   control={form.control}
//                   name="dueDate"
//                   render={({ field }) => (
//                     <FormItem className="flex flex-col">
//                       <FormLabel>Due Date</FormLabel>
//                       <Popover>
//                         <PopoverTrigger asChild>
//                           <FormControl>
//                             <Button
//                               variant={"outline"}
//                               className={cn(
//                                 "pl-3 text-left font-normal",
//                                 !field.value && "text-muted-foreground"
//                               )}
//                             >
//                               {field.value ? (
//                                 format(field.value, "PPP")
//                               ) : (
//                                 <span>Pick a date</span>
//                               )}
//                               <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
//                             </Button>
//                           </FormControl>
//                         </PopoverTrigger>
//                         <PopoverContent className="w-auto p-0" align="start">
//                           <Calendar
//                             mode="single"
//                             selected={field.value}
//                             onSelect={field.onChange}
//                             // disabled={(date) => date < new Date("1900-01-01")}
//                             captionLayout="dropdown"
//                           />
//                         </PopoverContent>
//                       </Popover>
//                     </FormItem>
//                   )}
//                 />
//                 <FormField
//                   control={form.control}
//                   name="priority"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Priority</FormLabel>
//                       <Select
//                         onValueChange={field.onChange}
//                         defaultValue={field.value}
//                       >
//                         <FormControl className="w-full">
//                           <SelectTrigger>
//                             <SelectValue placeholder="Select priority" />
//                           </SelectTrigger>
//                         </FormControl>
//                         <SelectContent>
//                           <SelectItem value="low">Low</SelectItem>
//                           <SelectItem value="medium">Medium</SelectItem>
//                           <SelectItem value="high">High</SelectItem>
//                         </SelectContent>
//                       </Select>
//                     </FormItem>
//                   )}
//                 />
//                 <FormField
//                   control={form.control}
//                   name="assignUser"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Assign User</FormLabel>
//                       <Select
//                         onValueChange={field.onChange}
//                         defaultValue={field.value}
//                       >
//                         <FormControl className="w-full">
//                           <SelectTrigger>
//                             <SelectValue placeholder="Select user" />
//                           </SelectTrigger>
//                         </FormControl>
//                         <SelectContent>
//                           {users.map((user) => {
//                             return (
//                               <SelectItem key={user.id} value={user.id}>
//                                 {user.name}
//                               </SelectItem>
//                             );
//                           })}
//                         </SelectContent>
//                       </Select>
//                     </FormItem>
//                   )}
//                 />
//                 <Button type="submit">Add</Button>
//               </form>
//             </Form>
//           </DialogContent>
//         </Dialog>
//       </div>
//     </div>
//   );
// }

// export default TaskControl;
