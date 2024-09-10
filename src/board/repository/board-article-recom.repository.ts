import { Repository } from "typeorm";
import { CustomRepository } from "../../configs/typeorm/custom.decorator";
import { BoardArticleRecom } from "../entity/board-article-recom.entity";

@CustomRepository(BoardArticleRecom)
export class BoardArticleRecomRepository extends Repository<BoardArticleRecom> {
}