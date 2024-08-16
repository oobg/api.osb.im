import { Repository } from "typeorm";
import { Board } from "./board.entity";
import { CreateBoardDto } from "./dto/create-board.dto";
import { BoardStatus } from "./board-status.enum";
import { NotFoundException } from "@nestjs/common";
import { CustomRepository } from "../configs/typeorm/custom.decorator";

@CustomRepository(Board)
export class BoardRepository extends Repository<Board> {
	async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
		const { title, description } = createBoardDto;

		const board = this.create({
			title,
			description,
			status: BoardStatus.PUBLIC,
		});

		await this.save(board);
		return board;
	}

	async getBoardById(id: number): Promise<Board> {
		const found = await this.findOne({ where: { id } });

		if (!found) {
			throw new NotFoundException(`다음 ID를 찾을 수 없습니다. '${id}'`);
		}

		return found;
	}

	async deleteBoard(id: number): Promise<Board> {
		const found = await this.getBoardById(id);
		return await this.remove(found);
	}
}