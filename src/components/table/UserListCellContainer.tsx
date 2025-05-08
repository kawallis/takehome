import { User } from "@/data/users";
import { UserListCell } from "./UserListCell";

export interface UserListCellContainerProps {
  value: User[];
  onChange: (value: User[]) => void;
}

export function UserListCellContainer(props: UserListCellContainerProps) {
  return <UserListCell {...props} />;
}
