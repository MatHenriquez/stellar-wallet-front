export class CreateUserRequest {
  name: string;
  lastName: string;
  email: string;
  password: string;
  publicKey?: string;
  secretKey?: string;

  constructor(data: CreateUserRequest) {
    this.name = data.name;
    this.lastName = data.lastName;
    this.email = data.email;
    this.password = data.password;
    this.publicKey = data.publicKey;
    this.secretKey = data.secretKey;
  }
}
