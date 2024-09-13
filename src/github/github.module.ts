import { Module } from '@nestjs/common';
import { CustomModule } from "../configs/typeorm/custom.module";
import { GithubController } from "./github.controller";
import { GithubService } from "./github.service";
import { GithubRepository } from "./github.repository";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import "dotenv/config";

@Module({
	imports: [
		CustomModule.forCustomRepository([GithubRepository]),
		ServeStaticModule.forRoot({
			rootPath: join(__dirname, "src", process.env.GIT_DIR || "clone"),  // 클론한 프로젝트의 경로
			serveRoot: "/static",  // 리소스에 접근할 경로 설정
		}),
	],
	controllers: [GithubController],
	providers: [GithubService],
})
export class GithubModule {}
