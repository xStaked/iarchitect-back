import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../models/user.model';
import { PayloadToken } from '../models/token.model';

@Injectable()
export class AuthService {
  constructor(private JwtService: JwtService) {}

  async validateUser(username: string, password: string) {
    const users: User[] = [
      {
        username: 'test',
        password: '1234556',
        role: 'admin',
        id: 1,
      },
    ];

    const user: User = users.find(
      (item) => item.username === username && item.password === password,
    );
    if (user) return user;

    return null;
  }

  generateJWT(user: User) {
    const payload: PayloadToken = { role: user.role, sub: user.id };

    return {
      access_token: this.JwtService.sign(payload),
    };
  }
}
