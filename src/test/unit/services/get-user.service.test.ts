import '@testing-library/jest-dom'
import { getUserService } from "../../../services/user/get-user.service.ts";
import userConfig from "../../../config/user.config.ts";

describe('getUserService', () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  it('should return null when there is no user in sessionStorage', () => {
    expect(getUserService()).toBeNull();
  });

  it('should return the user object when there is a user in sessionStorage', () => {
    const mockUser = { id: 1, name: 'Test User' };
    sessionStorage.setItem(userConfig.userKey, JSON.stringify(mockUser));

    expect(getUserService()).toEqual(mockUser);
  });
});