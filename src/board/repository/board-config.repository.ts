import { Repository } from "typeorm";
import { CustomRepository } from "../../configs/typeorm/custom.decorator";
import { BoardConfig } from "../entity/board-config.entity";

@CustomRepository(BoardConfig)
export class BoardConfigRepository extends Repository<BoardConfig> {
}