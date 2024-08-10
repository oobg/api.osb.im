import { Controller, Get } from "@nestjs/common";
import { GithubService } from "./github.service";
import { Board } from "./board.model";

@Controller('github')
export class GithubController {
	constructor(private githubService: GithubService) {}

	@Get('/')
	getAllBoards(): Board[] {
		return this.githubService.getAllBoards();
	}
}
