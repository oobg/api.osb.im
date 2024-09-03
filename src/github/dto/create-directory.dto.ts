import { IsString, IsOptional, IsInt, IsNotEmpty } from 'class-validator';

export class CreateDirectoryDto {
	@IsOptional()
	@IsInt()
	parentId?: number;

	@IsString()
	@IsNotEmpty()
	name: string;

	@IsString()
	@IsNotEmpty()
	path: string;
}