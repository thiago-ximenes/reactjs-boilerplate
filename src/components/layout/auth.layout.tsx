import { Outlet } from "react-router-dom";
import { AppBar } from "@mui/material";
import Grid from "@mui/material/Grid";
import useAuth from "../../hooks/use-auth.tsx";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

export default function AuthLayout() {
  const { logout, auth } = useAuth();

  return (
    <>
      <AppBar position="static">
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          px={ 6 }
          py={ 3 }
        >
          <Grid item>
            { `${ auth.user?.name } - ${ auth.user?.email }` }
          </Grid>
          <Grid item>
            <Button variant="contained" color="warning" onClick={ logout }>Logout</Button>
          </Grid>
        </Grid>
      </AppBar>
      <Box pl={ 3 }>
        <Outlet/>
      </Box>
    </>
  )
}