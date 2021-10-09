export class UserDetails {
  email?: string;
  username: string;
  password: string;

  constructor(username: string, password: string, email?: string) {
    if (username == undefined || username.length < 3) {
      throw new Error("You must enter a valid username.");
    }
    if (password == undefined || password.length < 12) {
      throw new Error("You must enter a valid password.");
    }

    this.username = username;
    this.password = password;
    this.email = email;
  }

  canRegister() {
    return this.email != null;
  }

  static fromJson(obj: { username: string; password: string; email?: string }) {
    return new UserDetails(obj.username, obj.password, obj.email);
  }
}
