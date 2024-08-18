import { Injectable, Logger } from "@nestjs/common";
import { GithubService } from "../github/github.service";
import { Cron } from "@nestjs/schedule";

@Injectable()
export class TaskService {
	private readonly logger = new Logger(TaskService.name);
	constructor(private readonly githubService: GithubService) {}

	@Cron("0 0 0 * * *") // Run every day at midnight
	async handleCron() {
		this.logger.debug("Running a task that updates the Github Service...");
		// await this.githubService.cloneRepository();
	}
}