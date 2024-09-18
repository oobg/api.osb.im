import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { TypeOrmConfig } from "./configs/typeorm.config";
import { BoardModule } from "./board/board.module";
import { BoardsModule } from './boards/boards.module';
import { ConfigModule } from "@nestjs/config";
import { GithubModule } from './github/github.module';
import { ScheduleModule } from "@nestjs/schedule";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`./env/.env.${process.env.NODE_ENV}`],
      isGlobal: true,
      cache: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", process.env.GIT_DIR || "post"),  // 클론한 프로젝트의 경로
      serveRoot: "/file",  // 리소스에 접근할 경로 설정
    }),
    TypeOrmModule.forRootAsync({ useFactory: TypeOrmConfig }),
    ScheduleModule.forRoot(),
    BoardModule,
    BoardsModule,
    GithubModule,
  ],
})
export class AppModule {}
