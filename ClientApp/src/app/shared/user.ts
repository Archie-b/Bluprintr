export class User {
  constructor(user?: User) {
    if (user !== undefined) {
      this.Username = user.Username;
      this.Password = user.Password;
      this.ConfirmPassword = user.ConfirmPassword;
    }
  }

  Username: string;
  Password: string;
  ConfirmPassword: string;
}
