import { Controller, Patch, Post, Put } from "@nestjs/common";
import { GithubService } from "./github.service";

@Controller("github")
export class GithubController {
	constructor(private readonly githubService: GithubService) {}

	@Put("/pull")
	updateBoard(): void {
		this.githubService.updateBoard();
	}
}
