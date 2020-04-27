import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OssModule } from './oss/oss.module';
import { CosModule } from './cos/cos.module';

@Module({
  imports: [TypeOrmModule.forRoot(), OssModule, CosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
