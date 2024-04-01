import { createContext } from "react";
import { AuthContextType } from "../types/context/auth.context.type.ts";

export const authContext = createContext<AuthContextType>({} as AuthContextType);