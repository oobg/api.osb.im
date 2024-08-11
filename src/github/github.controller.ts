import { Body, Controller, Delete, Get, Param, Patch, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { GithubService } from "./github.service";
import { Board, BoardStatus } from "./board.model";
import { CreateBoardDto } from "./dto/create-board.dto";

@Controller('github')
export class GithubController {
	constructor(private githubService: GithubService) {}

	@Get('/')
	getAllBoards(): Board[] {
		return this.githubService.getAllBoards();
	}

	@Post()
	@UsePipes(ValidationPipe)
	createBoard(@Body() createBoardDto: CreateBoardDto): Board {
		return this.githubService.createBoard(createBoardDto);
	}

	@Get('/:id')
	getBoardById(@Param('id') id: string): Board {
		return this.githubService.getBoardById(id);
	}

	@Delete('/:id')
	deleteBoard(@Param('id') id: string): void {
		this.githubService.deleteBoard(id);
	}

	@Patch('/:id/status')
	updateBoardStatus(
		@Param('id') id: string,
		@Body('status') status: BoardStatus,
	) {
		return this.githubService.updateBoardStatus(id, status);
	}
}
