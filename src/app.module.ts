import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma.service';
import { AuthModule } from './auth/auth.module';
import { DocumentsService } from './documents/documents.service';
import { DocumentsController } from './documents/documents.controller';
import { SignaturesService } from './signatures/signatures.service';
import { SignaturesController } from './signatures/signatures.controller';
import { AuthController } from './auth/auth.controller';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), AuthModule],
  controllers: [AuthController, DocumentsController, SignaturesController],
  providers: [PrismaService, DocumentsService, SignaturesService],
})
export class AppModule {}
