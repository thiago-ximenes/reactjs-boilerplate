import { PropsWithChildren } from "react";
import AuthProvider from "./auth.provider.tsx";

export default function Providers({children}: PropsWithChildren) {
  return (
    <AuthProvider>
      { children }
    </AuthProvider>
  )
}