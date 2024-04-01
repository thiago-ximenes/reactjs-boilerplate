export class AuthExceptions {
  private static mustBeUsedWithinAuthProviderMessage = "useAuth must be used within AuthProvider";
  static mustBeUsedWithinAuthProvider() {
    return new Error(AuthExceptions.mustBeUsedWithinAuthProviderMessage);
  }
}