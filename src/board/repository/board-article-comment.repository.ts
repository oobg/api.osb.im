import { Repository } from "typeorm";
import { CustomRepository } from "../../configs/typeorm/custom.decorator";
import { BoardArticleComment } from "../entity/board-article-comment.entity";

@CustomRepository(BoardArticleComment)
export class BoardArticleCommentRepository extends Repository<BoardArticleComment> {
}