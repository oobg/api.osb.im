import { Repository } from "typeorm";
import { CustomRepository } from "../../configs/typeorm/custom.decorator";
import { BoardArticleContent } from "../entity/board-article-content.entity";

@CustomRepository(BoardArticleContent)
export class BoardArticleContentRepository extends Repository<BoardArticleContent> {
}