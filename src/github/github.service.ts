import { Injectable } from '@nestjs/common';
import { GithubRepository } from "./github.repository";
import { gitClone, gitInstall, gitVersionCheck } from "./util/git";

@Injectable()
export class GithubService {
	constructor(private readonly githubRepository: GithubRepository) {}

	async cloneRepository(): Promise<string> {
		try {
			await gitVersionCheck();
			return await gitClone();
		} catch (error) {
			try {
				console.error("Initial attempt failed: ", error.message);
				await gitInstall();
				return await gitClone();
			} catch (installError) {
				console.error("Installation failed: ", installError.message);
				throw new Error(`Failed to install Git and clone the repository. Reason: ${installError.message}`);
			}
		}
	}
}