import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUsersDto {
  @IsString({ message: 'Should be string' })
  @IsEmail({}, { message: 'Should has email format' })
  readonly email: string;

  @Length(5, 20, { message: 'Should has length from 5 to 20' })
  readonly password: string;
}
