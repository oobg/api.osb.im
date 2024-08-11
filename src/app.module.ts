import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudyController } from './study/study.controller';
import { StudyService } from './study/study.service';

@Module({
  imports: [],
  controllers: [AppController, StudyController],
  providers: [AppService, StudyService],
})
export class AppModule {}
