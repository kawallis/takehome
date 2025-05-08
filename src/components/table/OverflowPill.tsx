"use client";

import { User } from "@/data/users";
import { UserAvatar } from "./UserAvatar";

export interface OverflowPillProps {
  count: number;
  users: User[];
}

import { useState } from "react";

export const OverflowPill: React.FC<OverflowPillProps> = ({ count, users }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => {
        setIsOpen(true);
      }}
      onMouseLeave={() => {
        setIsOpen(false);
      }}
    >
      <div className="flex items-center justify-center px-2 py-1 bg-gray-100 rounded-full shrink-0 cursor-pointer">
        <span className="text-sm text-gray-600">+{count}</span>
      </div>
      {/* Tooltip */}
      {isOpen && (
        <div className="absolute left-1/2 z-50 flex flex-col min-w-[180px] max-w-[260px] -translate-x-1/2 top-full mt-2 bg-white shadow-lg rounded-lg border border-gray-200 p-2 space-y-2">
          {users.map((user) => (
            <div key={user.id} className="flex items-center gap-2">
              <UserAvatar user={user} size={24} />
              <span className="text-sm text-gray-900 truncate">
                {user.name}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
