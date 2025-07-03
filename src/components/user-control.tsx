// import { useAppDispatch } from "@/redux/hooks";
// import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";

// import type { IUser } from "@/types";

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
// import { addUser } from "@/redux/features/user/userSlice";

// function UserControl() {
//   const form = useForm();
//   const dispatch = useAppDispatch();
//   const onSubmit: SubmitHandler<FieldValues> = (data) => {
//     dispatch(addUser(data as IUser));
//   };
//   return (
//     <div className="flex justify-between my-5 gap-3">
//       <h3>Users</h3>

//       <Dialog>
//         <DialogTrigger asChild>
//           <Button variant="default">Add User</Button>
//         </DialogTrigger>
//         <DialogContent className="sm:max-w-[425px]">
//           <DialogTitle className="sr-only">Nothing</DialogTitle>
//           <DialogDescription className="sr-only">
//             This action cannot be undone. This will permanently delete your
//             account and remove your data from our servers.
//           </DialogDescription>
//           <Form {...form}>
//             <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//               <FormField
//                 control={form.control}
//                 name="name"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Name</FormLabel>
//                     <FormControl>
//                       <Input
//                         placeholder="Name"
//                         {...field}
//                         value={field.value || ""}
//                       />
//                     </FormControl>
//                   </FormItem>
//                 )}
//               />
//               <Button type="submit">Add</Button>
//             </form>
//           </Form>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }

// export default UserControl;
