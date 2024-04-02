import '@testing-library/jest-dom'
import { act, fireEvent, screen, waitFor } from "@testing-library/react"
import guestRoutesConstants from "../../constants/routes/guest-routes.constants.tsx";
import authRoutesConstants from "../../constants/routes/auth-routes.constants.ts";
import LoginPage from "../../pages/guest/login.page.tsx";
import { Router } from "../../routes";
import { renderWithRouter } from "../setups/renderWithRouter.tsx";
import loginRequest from "../../requests/guest/login.request.ts";
import productListRequest from "../../requests/auth/product-list.request.ts";

jest.mock("../../requests/guest/login.request.ts")
jest.mock("../../requests/auth/product-list.request.ts")

describe('Login Page', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should navigate to register page', () => {
    const { getByRole } = renderWithRouter(
      <LoginPage/>
    )

    const registerLink = getByRole('link', {
      name: /não tem uma conta\? registre-se/i
    })

    expect(registerLink).toBeInTheDocument()

    fireEvent.click(registerLink)

    expect(window.location.pathname).toBe(guestRoutesConstants.register)
  })

  it('should login', async () => {
    renderWithRouter(<Router/>, { route: guestRoutesConstants.login });

    (loginRequest as jest.Mock).mockResolvedValue({
      data: {
        token: 'mockToken',
        user: {
          id: 1,
          name: 'mockName',
          email: 'mockEmail@example.com',
          lastName: 'mockLastName',
        },
      },
    });

    (productListRequest as jest.Mock).mockResolvedValue({ data: [] });


    const emailInput = screen.getByTestId('login-email')

    const passwordInput = screen.getByTestId('login-password')

    const submitButton = screen.getByRole('button', { name: /entrar/i })

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })

    fireEvent.change(passwordInput, { target: { value: 'password' } })

    await act(async () => {
      fireEvent.click(submitButton)
    })

    await waitFor(() => expect(window.location.pathname).toBe(authRoutesConstants.productList))
  })
})