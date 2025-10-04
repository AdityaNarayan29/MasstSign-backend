import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class DocumentsService {
  constructor(private prisma: PrismaService) {}

  async create(uploaderId: number, fileUrl: string, signerEmail: string) {
    const signer = await this.prisma.users.findUnique({ where: { email: signerEmail }});
    if (!signer) throw new NotFoundException('Signer not found');

    return this.prisma.documents.create({
      data: {
        fileUrl,
        uploaderId,
        signerId: signer.id,
        status: 'PENDING',
      },
    });
  }

  async assignedTo(signerId: number) {
    return this.prisma.documents.findMany({
      where: { signerId },
      include: { signatures: true, uploader: true },
    });
  }

  async uploadedBy(uploaderId: number) {
    return this.prisma.documents.findMany({ where: { uploaderId }, include: { signatures: true }});
  }

  async getById(id: number) {
    return this.prisma.documents.findUnique({ where: { id }, include: { signatures: true }});
  }

  async setStatus(id: number, status: 'SIGNED'|'VERIFIED'|'REJECTED') {
    return this.prisma.documents.update({ where: { id }, data: { status }});
  }
}
