import { Controller, Get, Query } from "@nestjs/common";
import { GithubService } from "./github.service";
import httpHandler from "./util/httpHandler";
import { ParseResult } from "../@types/board";
import { DefaultLogFields, LogResult } from "simple-git";  // simple-git에서 제공하는 타입을 가져옵니다.

interface HttpResponse<T> {
	status: number;
	message?: T;
	error?: string;
}

@Controller("github")
export class GithubController {
	constructor(private readonly githubService: GithubService) {}

	// Git 리포지토리 클론
	@Get("/clone")
	async cloneRepository(): Promise<HttpResponse<string | LogResult<DefaultLogFields>>> {
		// cloneRepository는 string 타입을 반환하므로, 반환 타입을 명확하게 지정
		return await httpHandler(async () => await this.githubService.cloneRepository());
	}

	// 리포지토리 파싱
	@Get("/parse")
	async parseRepository(): Promise<HttpResponse<ParseResult>> {
		return await httpHandler(async () => await this.githubService.parseRepository());
	}

	// Git 히스토리 가져오기
	@Get("/history")
	async getRepositoryHistory(@Query("limit") limit: string): Promise<HttpResponse<LogResult<any>>> {
		// 히스토리 결과가 LogResult 타입을 반환하도록 타입 지정
		const parsedLimit = parseInt(limit, 10) || 10;  // limit 값이 없으면 기본값 10
		return await httpHandler(async () => await this.githubService.getRepositoryHistory(parsedLimit));
	}

	@Get("/submodule/update")
	async updateSubmodulePost(): Promise<HttpResponse<string>> {
		return await httpHandler(async () => await this.githubService.updateSubmodulePost());
	}
}