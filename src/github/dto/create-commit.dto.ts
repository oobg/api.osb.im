import { IsNotEmpty } from "class-validator";

export class CreateCommitDto {
	@IsNotEmpty()
	commit: string;

	@IsNotEmpty()
	description: string;
}