"use client";
import useLocalStorage from "@/hooks/useLocalStorage";
import { createContext } from "react";

export enum VisibilityTypes {
    PUBLIC = "PUBLIC",
    PRIVATE_MESSAGE = "PRIVATE_MESSAGE",
}

type MessagingContextType = {
    properties: {
        to: string;
        type: VisibilityTypes;
    };
    setProperties: ({ to, type }: { to: string; type: "PRIVATE_MESSAGE" | "PUBLIC" }) => void;
};

const initialValue: MessagingContextType = {
    properties: {
        to: "Todos",
        type: VisibilityTypes.PUBLIC,
    },
    setProperties: () => {},
};

export const MessagingContext = createContext<MessagingContextType>(initialValue);

export function MessagingProvider({ children }: { children: React.ReactNode }) {
    const [properties, setProperties] = useLocalStorage("messagingData", MessagingContext);

    return <MessagingContext.Provider value={{ properties, setProperties }}>{children}</MessagingContext.Provider>;
}
