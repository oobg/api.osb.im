import { Module } from '@nestjs/common';
import { BoardsController } from './boards/boards.controller';
import { BoardsService } from './boards/boards.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { TypeOrmConfig } from "./configs/typeorm.config";
import { BoardsModule } from './boards/boards.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(TypeOrmConfig),
    BoardsModule,
  ],
  controllers: [BoardsController],
  providers: [BoardsService],
})
export class AppModule {}
