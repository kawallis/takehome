"use client";

import Image from "next/image";
import { User } from "@/types/table";

export interface UserAvatarProps {
  user: User;
  size?: number;
}

export const UserAvatar: React.FC<UserAvatarProps> = ({ user, size = 24 }) => (
  <Image
    src={user.avatar}
    alt={user.name}
    width={size}
    height={size}
    className={`w-${size / 4} h-${size / 4} rounded-full`}
  />
);
