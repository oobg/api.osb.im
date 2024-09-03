import { IsString, IsInt, IsNotEmpty } from 'class-validator';

export class CreateFileDto {
	@IsInt()
	@IsNotEmpty()
	directoryId: number;

	@IsString()
	@IsNotEmpty()
	name: string;

	@IsString()
	@IsNotEmpty()
	path: string;
}