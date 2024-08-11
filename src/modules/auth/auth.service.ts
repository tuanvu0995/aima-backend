import { HashService } from '@modules/hash';
import { UserService } from '@modules/user';
import { User } from '@modules/user/user.entity';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly hashService: HashService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userService.findOneByEmail(email);

    if (!user) return null;

    if (!(await this.hashService.compareHash(password, user.password))) {
      return null;
    }
    return user;
  }

  async createToken(user: User) {
    const payload = {
      email: user.email,
      sub: user.id,
    };
    const token = await this.jwtService.signAsync(payload, {
      expiresIn: '2d',
    });
    return {
      accessToken: token,
    };
  }
}
