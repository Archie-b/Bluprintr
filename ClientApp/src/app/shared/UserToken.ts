export class UserToken
{
  public token: string;
  public id : string;
  public timestamp: number;

  constructor(token: string, timestamp: number, id : string) {
    this.token = token;
    this.timestamp = timestamp;
    this.id = id;
  }



}
