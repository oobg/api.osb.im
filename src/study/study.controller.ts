import { Body, Controller, Delete, Get, Param, Patch, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { StudyService } from "./study.service";
import { Board, BoardStatus } from "./board.model";
import { CreateBoardDto } from "./dto/create-board.dto";
import {BoardStatusValidationPipe} from "./pipes/board-status-validation.pipe";

@Controller('study')
export class StudyController {
	constructor(private studyService: StudyService) {}

	@Get('/')
	getAllBoards(): Board[] {
		return this.studyService.getAllBoards();
	}

	@Post()
	@UsePipes(ValidationPipe)
	createBoard(@Body() createBoardDto: CreateBoardDto): Board {
		return this.studyService.createBoard(createBoardDto);
	}

	@Get('/:id')
	getBoardById(@Param('id') id: string): Board {
		return this.studyService.getBoardById(id);
	}

	@Delete('/:id')
	deleteBoard(@Param('id') id: string): void {
		this.studyService.deleteBoard(id);
	}

	@Patch('/:id/status')
	updateBoardStatus(
		@Param('id') id: string,
		@Body('status', BoardStatusValidationPipe) status: BoardStatus,
	) {
		return this.studyService.updateBoardStatus(id, status);
	}
}
