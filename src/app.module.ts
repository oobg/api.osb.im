import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { TypeOrmConfig } from "./configs/typeorm.config";
import { BoardsModule } from './boards/boards.module';
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.${process.env.NODE_ENV}`],
      isGlobal: true,
      cache: true,
    }),
    TypeOrmModule.forRootAsync({ useFactory: TypeOrmConfig }),
    BoardsModule,
  ],
})
export class AppModule {}
