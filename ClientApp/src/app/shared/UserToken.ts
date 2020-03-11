export class UserToken
{
  public token: string;
  public timestamp: number;

  constructor(token: string, timestamp: number) {
    this.token = token;
    this.timestamp = timestamp;
  }



}
