import { Module } from "@nestjs/common";
import { BoardsController } from "./boards.controller";
import { BoardsService } from "./boards.service";
import { CustomModule } from "../configs/typeorm/custom.module";
import { BoardRepository } from "./board.repository";

@Module({
	imports: [
		CustomModule.forCustomRepository([BoardRepository])
	],
	controllers: [BoardsController],
	providers: [BoardsService],
})
export class BoardsModule {}
