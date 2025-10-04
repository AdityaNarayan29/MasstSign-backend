import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { SignaturesService } from './signatures.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../common/roles.guard';
import { Roles } from '../common/roles.decorator';

@Controller('signatures')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class SignaturesController {
  constructor(private svc: SignaturesService) {}

  @Post('sign')
  @Roles('SIGNER')
  async sign(@Req() req: any, @Body() body: { documentId: number; signatureUrl: string; name: string; }) {
    return this.svc.create(body.documentId, req.user.id, body.signatureUrl, body.name);
  }
}
