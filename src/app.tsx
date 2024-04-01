import Providers from "./providers";
import { Outlet } from "react-router-dom";
import Guards from "./components/guards";
import { CssBaseline } from "@mui/material";

export default function App() {
  return (
      <Providers>
        <Guards>
          <CssBaseline />
          <Outlet/>
        </Guards>
      </Providers>
  );
}