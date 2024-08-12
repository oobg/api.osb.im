import { Module } from '@nestjs/common';
import { BoardRepository } from "./board.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { StudyController } from "./study.controller";
import { StudyService } from "./study.service";

@Module({
	imports: [
		TypeOrmModule.forFeature([BoardRepository]),
	],
	controllers: [StudyController],
	providers: [StudyService],
})
export class StudyModule {
}
