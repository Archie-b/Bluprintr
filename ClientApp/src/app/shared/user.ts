export class User {
  constructor(user?: User) {
    if (user !== undefined) {
      this.Id = user.Id;
      this.Username = user.Username;
      this.Password = user.Password;
      this.ConfirmPassword = user.ConfirmPassword;
    }
  }
  Id : string;
  Username: string;
  Password: string;
  ConfirmPassword: string;
}
