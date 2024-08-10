import { Body, Controller, Get, Post } from "@nestjs/common";
import { GithubService } from "./github.service";
import { Board } from "./board.model";

@Controller('github')
export class GithubController {
	constructor(private githubService: GithubService) {}

	@Get('/')
	getAllBoards(): Board[] {
		return this.githubService.getAllBoards();
	}

	@Post()
	createBoard(
		@Body('title') title: string,
		@Body('description') description: string,
	): Board {
		return this.githubService.createBoard(title, description);
	}
}
