import { Injectable, NotFoundException } from "@nestjs/common";
import { BoardStatus } from "./board-status.enum";
import { CreateBoardDto } from "./dto/create-board.dto";
import { BoardRepository } from "./board.repository";
import { Board } from "./board.entity";

@Injectable()
export class BoardsService {
	constructor(private readonly boardRepository: BoardRepository) {}

	async getAllBoards(): Promise<Board[]> {
		return await this.boardRepository.find();
	}

	createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
		return this.boardRepository.createBoard(createBoardDto);
	}

	getBoardById(id: number): Promise<Board> {
		return this.boardRepository.getBoardById(id);
	}

	deleteBoard(id: number): Promise<Board> {
		return this.boardRepository.deleteBoard(id);
	}

	updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
		return this.boardRepository.updateBoardStatus(id, status);
	}
}
