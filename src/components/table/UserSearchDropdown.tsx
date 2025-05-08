"use client";

import { CheckIcon } from "@heroicons/react/20/solid";
import React, { useRef, useEffect } from "react";
import { User } from "@/data/users";

export interface UserSearchDropdownProps {
  isOpen: boolean;
  users: User[];
  selectedUsers: User[];
  query: string;
  onQueryChange: (query: string) => void;
  onUserSelect: (user: User) => void;
  onClose: () => void;
}

export const UserSearchDropdown: React.FC<UserSearchDropdownProps> = ({
  isOpen,
  users,
  selectedUsers,
  query,
  onQueryChange,
  onUserSelect,
  onClose,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredUsers =
    query === ""
      ? users
      : users.filter((person) =>
          person.name.toLowerCase().includes(query.toLowerCase())
        );

  return (
    <div
      ref={dropdownRef}
      className="absolute z-50 mt-2 w-full bg-white rounded-lg shadow-lg border border-gray-200"
    >
      <div className="p-2">
        <input
          type="text"
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Search users..."
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
        />
      </div>
      <div className="max-h-60 overflow-auto">
        {filteredUsers.map((user) => (
          <div
            key={user.id}
            className={`flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-gray-50 ${
              selectedUsers.some((u) => u.id === user.id) ? "bg-indigo-50" : ""
            }`}
            onClick={() => onUserSelect(user)}
          >
            <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-xs text-gray-600">
                {user.name.charAt(0)}
              </span>
            </div>
            <span className="text-sm">{user.name}</span>
            {selectedUsers.some((u) => u.id === user.id) && (
              <CheckIcon className="w-5 h-5 text-indigo-600 ml-auto" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
