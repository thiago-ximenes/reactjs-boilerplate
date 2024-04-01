import { Route, Routes } from "react-router-dom";
import App from "../app.tsx";
import LoginPage from "../pages/guest/login.page.tsx";
import RegisterPage from "../pages/guest/register.page.tsx";
import authRoutesConstantes from "../constants/routes/auth-routes.constants.ts";
import publicRoutesConstants from "../constants/routes/guest-routes.constants.tsx";
import ProductListPage from "../pages/auth/product-list.page.tsx";
export const Router = () => (
  <Routes>
    <Route path="/" element={ <App/> }>
      <Route path={publicRoutesConstants.login} element={ <LoginPage /> }/>
      <Route path={publicRoutesConstants.register} element={ <RegisterPage /> }/>
      <Route path={authRoutesConstantes.productList} element={ <ProductListPage /> }/>
    </Route>
  </Routes>
);