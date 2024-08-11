import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { GithubService } from "./github.service";
import { Board } from "./board.model";
import { CreateBoardDto } from "./dto/create-board.dto";

@Controller('github')
export class GithubController {
	constructor(private githubService: GithubService) {}

	@Get('/')
	getAllBoards(): Board[] {
		return this.githubService.getAllBoards();
	}

	@Post()
	createBoard(@Body() createBoardDto: CreateBoardDto): Board {
		return this.githubService.createBoard(createBoardDto);
	}

	@Get('/:id')
	getBoardById(@Param('id') id: string): Board {
		return this.githubService.getBoardById(id);
	}
}
