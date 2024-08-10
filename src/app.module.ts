import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GithubController } from './github/github.controller';

@Module({
  imports: [],
  controllers: [AppController, GithubController],
  providers: [AppService],
})
export class AppModule {}
