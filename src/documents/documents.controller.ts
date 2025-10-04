import { Controller, Post, Body, UseGuards, Req, Get, Param, Patch } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../common/roles.guard';
import { Roles } from '../common/roles.decorator';

@Controller('documents')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class DocumentsController {
  constructor(private svc: DocumentsService) {}

  @Post('upload')
  @Roles('UPLOADER')
  async upload(@Req() req: any, @Body() body: { fileUrl: string; signerEmail: string; }) {
    // fileUrl: uploader should upload file to S3/Cloudinary externally and send URL
    const uploaderId = req.user.id;
    return this.svc.create(uploaderId, body.fileUrl, body.signerEmail);
  }

  @Get('assigned')
  @Roles('SIGNER')
  async assigned(@Req() req: any) {
    return this.svc.assignedTo(req.user.id);
  }

  @Get('uploaded')
  @Roles('UPLOADER')
  async uploaded(@Req() req: any) {
    return this.svc.uploadedBy(req.user.id);
  }

  @Patch(':id/status')
  @Roles('UPLOADER')
  async setStatus(@Param('id') id: string, @Body() body: { status: 'VERIFIED'|'REJECTED' }) {
    return this.svc.setStatus(Number(id), body.status as any);
  }
}
