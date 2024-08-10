import { Body, Controller, Get, Post } from "@nestjs/common";
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
}
