"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type UserRole = "STUDENT" | "TEACHER" | "PARENT";

export type UserPayload = {
  id?: string;
  role: UserRole;
  name: string;
  phone: string;
  email?: string;
  extra?: string; // class / subject / student name
};

type UsersContextType = {
  role: UserRole | null;
  editingUser?: UserPayload;
  openAdd: (role: UserRole) => void;
  openEdit: (user: UserPayload) => void;
  close: () => void;
  refreshKey: number;
  triggerRefresh: () => void;
  code?: string;
};

const UsersContext = createContext<UsersContextType | null>(null);

export function UsersProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<UserRole | null>(null);
  const [editingUser, setEditingUser] = useState<UserPayload | undefined>();
  const [refreshKey, setRefreshKey] = useState(0);
  const [code, setCode] = useState(undefined);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/user", {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      setCode(data.code);
    };
    fetchData();
  }, []);

  const openAdd = (role: UserRole) => {
    setRole(role);
    setEditingUser(undefined);
  };

  const openEdit = (user: UserPayload) => {
    setRole(user.role);
    setEditingUser(user);
  };

  const close = () => {
    setRole(null);
    setEditingUser(undefined);
  };

  const triggerRefresh = () => setRefreshKey((k) => k + 1);

  return (
    <UsersContext.Provider
      value={{
        role,
        editingUser,
        openAdd,
        openEdit,
        close,
        refreshKey,
        triggerRefresh,
        code,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
}

export function useUsers() {
  const ctx = useContext(UsersContext);
  if (!ctx) throw new Error("useUsers must be inside UsersProvider");
  return ctx;
}
