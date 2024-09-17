import { Module } from '@nestjs/common';
import { CustomModule } from "../configs/typeorm/custom.module";
import { GithubController } from "./github.controller";
import { GithubService } from "./github.service";
import { GithubRepository } from "./github.repository";
import "dotenv/config";

@Module({
	imports: [
		CustomModule.forCustomRepository([GithubRepository]),
	],
	controllers: [GithubController],
	providers: [GithubService],
})
export class GithubModule {}
