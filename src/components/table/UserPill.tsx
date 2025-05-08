"use client";

import { User } from "@/types/table";
import { UserAvatar } from "./UserAvatar";

export interface UserPillProps {
  user: User;
}

export const UserPill: React.FC<UserPillProps> = ({ user }) => (
  <div className="flex items-center gap-1 user-item shrink-0 min-w-[100px]">
    <UserAvatar user={user} />
    <span className="text-sm whitespace-nowrap truncate">{user.name}</span>
  </div>
);
