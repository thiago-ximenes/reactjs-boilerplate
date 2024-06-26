import { Route, Routes } from "react-router-dom";
import App from "../app.tsx";
import LoginPage from "../pages/guest/login.page.tsx";
import RegisterPage from "../pages/guest/register.page.tsx";
import authRoutesConstants from "../constants/routes/auth-routes.constants.ts";
import publicRoutesConstants from "../constants/routes/guest-routes.constants.tsx";
import ProductListPage from "../pages/auth/product-list.page.tsx";
import AuthLayout from "../components/layout/auth.layout.tsx";
import ProductPage from "../pages/auth/product.page.tsx";

export const Router = () => (
  <Routes>
    <Route path="/" element={ <App/> }>
      <Route path={ publicRoutesConstants.login } element={ <LoginPage/> }/>
      <Route path={ publicRoutesConstants.register } element={ <RegisterPage/> }/>
      <Route path="/" element={ <AuthLayout /> }>
        <Route path={ authRoutesConstants.productList } element={ <ProductListPage/> }/>
        <Route path={ authRoutesConstants.productListById } element={ <ProductPage /> }/>
      </Route>
    </Route>
  </Routes>
);