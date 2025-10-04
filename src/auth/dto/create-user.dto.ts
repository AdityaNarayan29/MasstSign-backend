export class CreateUserDto {
  email!: string;
  password!: string;
  role!: 'UPLOADER' | 'SIGNER';
}
