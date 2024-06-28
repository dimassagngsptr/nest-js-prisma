import { Prisma } from '@prisma/client';

export class User implements Prisma.UserCreateInput {
  fullname: string;
  email: string;
  password: string;
}
