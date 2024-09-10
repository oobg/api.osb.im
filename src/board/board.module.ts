import { Module } from "@nestjs/common";
import { BoardController } from "./board.controller";
import { BoardService } from "./board.service";
import { CustomModule } from "../configs/typeorm/custom.module";
import { BoardArticleRepository } from "./repository/board-article.repository";
import { BoardArticleCommentRepository } from "./repository/board-article-comment.repository";
import { BoardArticleContentRepository } from "./repository/board-article-content.repository";
import { BoardArticleRecomRepository } from "./repository/board-article-recom.repository";
import { BoardClassRepository } from "./repository/board-class.repository";
import { BoardConfigRepository } from "./repository/board-config.repository";

@Module({
	imports: [
		CustomModule.forCustomRepository([
			BoardArticleRepository,
			BoardArticleCommentRepository,
			BoardArticleContentRepository,
			BoardArticleRecomRepository,
			BoardClassRepository,
			BoardConfigRepository,
		])
	],
	controllers: [BoardController],
	providers: [BoardService],
})
export class BoardModule {}
