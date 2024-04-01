import useAuth from "../../hooks/use-auth.tsx";
import Button from "@mui/material/Button";

export default function ProductListPage() {
  const {logout} = useAuth()

  return (
    <Button onClick={ logout }>Logout</Button>
  )
}