import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { AuthService } from './auth.service';

@Module({
  imports: [DatabaseModule],
  providers: [AuthService],
})
export class UsersModule {}
