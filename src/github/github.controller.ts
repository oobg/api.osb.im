import { Controller, Get } from "@nestjs/common";
import { GithubService } from "./github.service";
import httpHandler from "./util/httpHandler";

interface HttpResponse<T> {
	status: number;
	message?: T;
	error?: string;
}

@Controller("github")
export class GithubController {
	constructor(private readonly githubService: GithubService) {}

	@Get("/clone")
	async cloneRepository(): Promise<HttpResponse<string>> {
		// httpHandler 함수가 반환한 결과를 그대로 클라이언트에 응답
		return await httpHandler(async () => await this.githubService.cloneRepository());
	}
}