import { Repository } from "typeorm";
import { CustomRepository } from "../../configs/typeorm/custom.decorator";
import { BoardClass } from "../entity/board-class.entity";

@CustomRepository(BoardClass)
export class BoardClassRepository extends Repository<BoardClass> {
}