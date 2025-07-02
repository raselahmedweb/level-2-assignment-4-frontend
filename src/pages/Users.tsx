import { Button } from "@/components/ui/button";
import UserControl from "@/components/user-control";
import { deleteUser, selectUsers } from "@/redux/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Trash2Icon } from "lucide-react";

export default function Users() {
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectUsers);
  return (
    <>
      <UserControl />
      <div className="flex flex-wrap gap-5">
        {users.map((user, idx) => {
          return (
            <div
              key={idx}
              className="border border-green-500 px-5 py-3 rounded-md w-80"
            >
              <div className="flex justify-between items-center">
                <div className="flex gap-2 items-center">
                  <h1>{user.name}</h1>
                </div>
                <div className="flex gap-1 items-center">
                  <Button
                    onClick={() => dispatch(deleteUser(user.id))}
                    variant="link"
                    className="p-0 text-red-500"
                  >
                    <Trash2Icon />
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
