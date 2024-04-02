import '@testing-library/jest-dom'
import { act, fireEvent, screen, waitFor } from "@testing-library/react"
import guestRoutesConstants from "../../constants/routes/guest-routes.constants.tsx";
import { Router } from "../../routes";
import { renderWithRouter } from "../setups/renderWithRouter.tsx";
import RegisterPage from "../../pages/guest/register.page.tsx";
import registerRequest from "../../requests/guest/register.request.ts";

jest.mock("../../requests/guest/register.request.ts")

describe('Register Page', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should navigate to login page', () => {
    const { getByRole } = renderWithRouter(
      <RegisterPage/>
    )

    const loginLink = getByRole('link', {
      name: /já possui uma conta\? entrar/i
    })

    expect(loginLink).toBeInTheDocument()

    fireEvent.click(loginLink)

    expect(window.location.pathname).toBe(guestRoutesConstants.login)
  })

  it('should register', async () => {
    jest.useFakeTimers();
    await act(async () => renderWithRouter(<Router/>, { route: guestRoutesConstants.register }));

    (registerRequest as jest.Mock).mockResolvedValue({});

    const name = screen.getByTestId('register-name')

    const lastName = screen.getByTestId('register-last-name')

    const emailInput = screen.getByTestId('register-email')

    const passwordInput = screen.getByTestId('register-password')

    const submitButton = screen.getByRole('button', { name: /registrar/i })

    fireEvent.change(name, { target: { value: 'Test' } })

    fireEvent.change(lastName, { target: { value: 'User' } })

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })

    fireEvent.change(passwordInput, { target: { value: 'password' } })

    await act(async () => {
      fireEvent.click(submitButton)
    })

    jest.runAllTimers();

    await waitFor(() => expect(window.location.pathname).toBe(guestRoutesConstants.login))
  })
})