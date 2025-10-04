import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService) {}

  async register(email: string, password: string, role: 'UPLOADER'|'SIGNER') {
    const existing = await this.prisma.users.findUnique({ where: { email }});
    if (existing) throw new Error('User exists');
    const hashed = await bcrypt.hash(password, 10);
    const user = await this.prisma.users.create({
      data: { email, password: hashed, role }
    });
    const token = this.jwt.sign({ sub: user.id, email: user.email, role: user.role });
    return { token, user: { id: user.id, email: user.email, role: user.role } };
  }

  async login(email: string, password: string) {
    const user = await this.prisma.users.findUnique({ where: { email }});
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) throw new UnauthorizedException('Invalid credentials');
    const token = this.jwt.sign({ sub: user.id, email: user.email, role: user.role });
    return { token, user: { id: user.id, email: user.email, role: user.role } };
  }

  async validateUser(userId: number) {
    return this.prisma.users.findUnique({ where: { id: userId }});
  }
}
