import { Injectable } from '@nestjs/common';
import { GithubRepository } from "./github.repository";
import { gitClone, gitHistory } from "./util/git";
import { parser } from "./util/pathParser";
import { ParseResult } from "../@types/board";
import { LogResult } from "simple-git";

@Injectable()
export class GithubService {
	constructor(private readonly githubRepository: GithubRepository) {}

	// 리포지토리 클론 함수
	async cloneRepository(): Promise<LogResult | string> {
		try {
			return await gitClone();  // Git 설치 여부 확인 없이 바로 클론
		} catch (error) {
			console.error("Error during git clone: ", error.message);
			throw new Error(`Failed to clone the repository. Reason: ${error.message}`);
		}
	}

	// 리포지토리 파싱 함수
	async parseRepository(): Promise<ParseResult> {
		try {
			return parser();  // parser 함수가 ParseResult 타입을 반환하도록 타입을 지정
		} catch (error) {
			throw new Error(`Failed to parse the repository. Reason: ${error.message}`);
		}
	}

	// Git 히스토리 가져오는 함수
	async getRepositoryHistory(limit: number = 10): Promise<any> {
		try {
			console.log("Fetching git history...");
			console.log("limit", limit);
			return await gitHistory();  // 모든 커밋 로그를 반환
		} catch (error) {
			console.error("Error fetching git history: ", error.message);
			throw new Error(`Failed to fetch git history. Reason: ${error.message}`);
		}
	}
}