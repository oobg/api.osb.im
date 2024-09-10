import { Repository } from "typeorm";
import { CustomRepository } from "../../configs/typeorm/custom.decorator";
import { BoardArticle } from "../entity/board-article.entity";

@CustomRepository(BoardArticle)
export class BoardArticleRepository extends Repository<BoardArticle> {
}