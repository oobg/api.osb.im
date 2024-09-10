import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { TypeOrmConfig } from "./configs/typeorm.config";
import { BoardModule } from "./board/board.module";
import { BoardsModule } from './boards/boards.module';
import { ConfigModule } from "@nestjs/config";
import { GithubModule } from './github/github.module';
import { ScheduleModule } from "@nestjs/schedule";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`./env/.env.${process.env.NODE_ENV}`],
      isGlobal: true,
      cache: true,
    }),
    TypeOrmModule.forRootAsync({ useFactory: TypeOrmConfig }),
    ScheduleModule.forRoot(),
    BoardModule,
    BoardsModule,
    GithubModule,
  ],
})
export class AppModule {}
