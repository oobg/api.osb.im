import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudyController } from './study/study.controller';
import { StudyService } from './study/study.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { TypeOrmConfig } from "./configs/typeorm.config";
import { StudyModule } from './study/study.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(TypeOrmConfig),
    StudyModule,
  ],
  controllers: [AppController, StudyController],
  providers: [AppService, StudyService],
})
export class AppModule {}
