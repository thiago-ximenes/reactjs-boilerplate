import { PropsWithChildren } from "react";
import AuthGuard from "./auth.guard.tsx";
import GuestGuard from "./guest.guard.tsx";

export default function Guards({children}: PropsWithChildren) {

  return (
    <AuthGuard>
      <GuestGuard>
        { children }
      </GuestGuard>
    </AuthGuard>
  )
}