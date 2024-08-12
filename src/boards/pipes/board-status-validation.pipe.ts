import { BadRequestException, PipeTransform } from "@nestjs/common";
import { BoardStatus } from "../board.model";

export class BoardStatusValidationPipe implements PipeTransform {

	readonly StatusOptions = [
		BoardStatus.PUBLIC,
		BoardStatus.PRIVATE,
	];

	transform(value: any) {
		value = value.toUpperCase();

		if (!this.isStatusValid(value)) {
			throw new BadRequestException(`'${value}' 는 유효한 상태가 아닙니다.`);
		}

		return value;
	}

	private isStatusValid(status: any) {
		const index = this.StatusOptions.indexOf(status);
		return index !== -1;
	}
}