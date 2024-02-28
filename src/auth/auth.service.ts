import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class AuthService {
  constructor(private databaseService: DatabaseService) {}

  async signIn(email: string, password: string): Promise<any> {
    const user = await this.databaseService.user.findUnique({
      where: { email: email, password: password },
    });
    if (!user) {
        console.log("User not found")
    }
  }
}
