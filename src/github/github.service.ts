import { Injectable } from '@nestjs/common';
import { GithubRepository } from "./github.repository";

@Injectable()
export class GithubService {
	constructor(private readonly githubRepository: GithubRepository) {}

	updateBoard(): void {
	}
}
