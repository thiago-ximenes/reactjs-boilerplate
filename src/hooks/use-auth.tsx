import { useContext } from "react";
import { authContext } from "../context/auth.context.ts";
import { AuthExceptions } from "../exceptions/context/auth.exceptions.ts";

export default function useAuth() {
  const context = useContext(authContext);

  if (!context) {
    throw AuthExceptions.mustBeUsedWithinAuthProvider();
  }

  return context;
}