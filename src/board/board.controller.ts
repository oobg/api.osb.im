import {
	Controller,
} from "@nestjs/common";
import { BoardService } from "./board.service";

@Controller("board-app")
export class BoardController {
	constructor(private readonly boardService: BoardService) {}
}
