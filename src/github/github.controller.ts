import { Controller, Get, HttpException, HttpStatus } from "@nestjs/common";
import { GithubService } from "./github.service";

@Controller("github")
export class GithubController {
	constructor(private readonly githubService: GithubService) {}

	@Get("/clone")
	async cloneRepository(): Promise<{ status: number; message: string }> {
		try {
			const message = await this.githubService.cloneRepository();
			return {
				status: HttpStatus.OK,
				message: message,
			};
		} catch (error) {
			throw new HttpException(
				{
					status: HttpStatus.INTERNAL_SERVER_ERROR,
					error: error.message,
				},
				HttpStatus.INTERNAL_SERVER_ERROR
			);
		}
	}
}