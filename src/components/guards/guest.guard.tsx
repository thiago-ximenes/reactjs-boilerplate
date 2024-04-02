import { PropsWithChildren, useEffect } from "react";
import useAuth from "../../hooks/use-auth.tsx";
import { useNavigate } from "react-router-dom";
import guestRoutesConstants from "../../constants/routes/guest-routes.constants.tsx";

export default function GuestGuard({ children }: PropsWithChildren) {
  const { auth } = useAuth();
  const navigate = useNavigate();


  useEffect(() => {
    const isGuestRouteService = Object.values(guestRoutesConstants).includes(location.pathname)
    const isRootRouteService = location.pathname === '/'

    if (!auth.isAuth && (!isGuestRouteService || isRootRouteService)) {
      navigate(guestRoutesConstants.login);
    }
  }, [auth.isAuth, navigate]);


  return (
    <>
      { children }
    </>
  )
}