import { Module } from '@nestjs/common';
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
  controllers: [StudyController],
  providers: [StudyService],
})
export class AppModule {}
