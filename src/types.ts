export interface ITask {
  id: string;
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  dueDate: string;
  isCompleted: boolean;
  assignUser: string | null;
}

export interface IUser {
  id: string;
  name: string;
}
