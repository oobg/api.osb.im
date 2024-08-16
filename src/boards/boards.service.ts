import { Injectable, NotFoundException } from "@nestjs/common";
import { BoardStatus } from "./board-status.enum";
import { CreateBoardDto } from "./dto/create-board.dto";
import { BoardRepository } from "./board.repository";
import { Board } from "./board.entity";

@Injectable()
export class BoardsService {
	constructor(private readonly boardRepository: BoardRepository) {}

	// getAllBoards(): Board[] {
	// 	return this.boards;
	// }

	createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
		return this.boardRepository.createBoard(createBoardDto);
	}

	async getBoardById(id: number): Promise<Board> {
		return this.boardRepository.getBoardById(id);
	}

	deleteBoard(id: number): Promise<Board> {
		return this.boardRepository.deleteBoard(id);
	}

	// updateBoardStatus(id: string, status: BoardStatus): Board {
	// 	const board = this.getBoardById(id);
	// 	board.status = status;
	// 	return board;
	// }
}
