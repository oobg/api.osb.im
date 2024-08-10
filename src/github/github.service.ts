import { Injectable } from "@nestjs/common";
import { Board } from "./board.model";

@Injectable()
export class GithubService {
	private boards: Board[] = [];

	getAllBoards(): Board[] {
		return this.boards;
	}
}
