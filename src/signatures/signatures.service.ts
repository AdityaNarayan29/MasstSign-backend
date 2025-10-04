import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class SignaturesService {
  constructor(private prisma: PrismaService) {}

  async create(documentId: number, signerId: number, signatureUrl: string, name: string) {
    const doc = await this.prisma.documents.findUnique({ where: { id: documentId }});
    if (!doc) throw new NotFoundException('Document not found');
    if (doc.signerId !== signerId) throw new NotFoundException('Not assigned to you');

    const sig = await this.prisma.signatures.create({
      data: {
        documentId,
        signerId,
        signatureUrl,
        signedAt: new Date(),
      }
    });

    await this.prisma.documents.update({ where: { id: documentId }, data: { status: 'SIGNED' }});
    return sig;
  }
}
