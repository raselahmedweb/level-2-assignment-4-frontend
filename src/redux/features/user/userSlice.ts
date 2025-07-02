import type { RootState } from "@/redux/store";
import type { IUser } from "@/types";
import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  users: IUser[];
}
const initialState: InitialState = {
  users: [
    {
      id: "ihjvhvigy6yhgnh",
      name: "Rasel",
    },
    {
      id: "ihjvhvigyrgfr",
      name: "Mir",
    },
    {
      id: "ihjvhvigyede",
      name: "Mezba",
    },
    {
      id: "ihjvhvigyff",
      name: "Jhankar",
    },
  ],
};

type DraftUser = Pick<IUser, "name">;

const createUser = (userData: DraftUser): IUser => {
  return { id: nanoid(), ...userData };
};
export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, actions: PayloadAction<DraftUser>) => {
      const taskData = createUser(actions.payload);
      state.users.push(taskData);
    },
    deleteUser: (state, actions: PayloadAction<string>) => {
      state.users = state.users.filter((user) => user.id !== actions.payload);
    },
  },
});

export const { addUser, deleteUser } = userSlice.actions;

export const selectUsers = (state: RootState) => {
  return state.allUser.users;
};

export default userSlice.reducer;
