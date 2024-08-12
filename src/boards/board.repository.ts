import { DataSource, Repository } from "typeorm";
import { BoardEntity } from "./board.entity";
import { CreateBoardDto } from "./dto/create-board.dto";
import { BoardStatus } from "./board-status.enum";
import { NotFoundException } from "@nestjs/common";
import { CustomRepository } from "../configs/typeorm-ex.decorator";

@CustomRepository(BoardEntity)
export class BoardRepository extends Repository<BoardEntity> {
	async createBoard(createBoardDto: CreateBoardDto): Promise<BoardEntity> {
		const { title, description } = createBoardDto;

		const board = this.create({
			title,
			description,
			status: BoardStatus.PUBLIC,
		});

		await this.save(board);
		return board;
	}

	async getBoardById(id: number): Promise<BoardEntity> {
		const found = await this.findOne({ where: { id } });

		if (!found) {
			throw new NotFoundException(`다음 ID를 찾을 수 없습니다. '${id}'`);
		}

		return found;
	}
}