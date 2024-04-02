import useAuth from "../../hooks/use-auth.tsx";
import { PropsWithChildren, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authRoutesConstants from "../../constants/routes/auth-routes.constants.ts";
import guestRoutesConstants from "../../constants/routes/guest-routes.constants.tsx";

export default function AuthGuard({ children }: PropsWithChildren) {
  const { auth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const isGuestRouteService = Object.values(guestRoutesConstants).includes(location.pathname)
    const isRootRouteService = location.pathname === '/'


    if (auth.isAuth && (isGuestRouteService || isRootRouteService)) {
      navigate(authRoutesConstants.productList);
    }

  }, [navigate, auth.isAuth]);

  return (
    <>
      { children }
    </>
  )
}