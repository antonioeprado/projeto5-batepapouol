"use client";
import useLocalStorage from "@/hooks/useLocalStorage";
import { createContext } from "react";

type UserContextType = {
    username: string;
    setUsername: (name: string) => void;
};

export const UserContext = createContext<UserContextType>({ username: "", setUsername: () => {} });

export function UserProvider({ children }: { children: React.ReactNode }) {
    const [username, setUsername] = useLocalStorage("userData", {});

    return <UserContext.Provider value={{ username, setUsername }}>{children}</UserContext.Provider>;
}
