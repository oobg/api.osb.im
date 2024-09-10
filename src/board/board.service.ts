import { Injectable, NotFoundException } from "@nestjs/common";
import { BoardArticleRepository } from "./repository/board-article.repository";
import { BoardArticleCommentRepository } from "./repository/board-article-comment.repository";
import { BoardArticleContentRepository } from "./repository/board-article-content.repository";
import { BoardArticleRecomRepository} from "./repository/board-article-recom.repository";
import { BoardClassRepository } from "./repository/board-class.repository";
import { BoardConfigRepository } from "./repository/board-config.repository";

@Injectable()
export class BoardService {
	constructor(
		private readonly boardArticleRepository: BoardArticleRepository,
		private readonly boardArticleCommentRepository: BoardArticleCommentRepository,
		private readonly boardArticleContentRepository: BoardArticleContentRepository,
		private readonly boardArticleRecomRepository: BoardArticleRecomRepository,
		private readonly boardClassRepository: BoardClassRepository,
		private readonly boardConfigRepository: BoardConfigRepository,
	) {}
}
