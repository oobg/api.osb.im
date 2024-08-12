import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { TypeOrmConfig } from "./configs/typeorm.config";
import { BoardsModule } from './boards/boards.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(TypeOrmConfig),
    BoardsModule,
  ],
})
export class AppModule {}
