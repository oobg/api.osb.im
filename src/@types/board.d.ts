interface DirectoryTree {
	[key: string]: string[] | DirectoryTree;
}

interface ParseResult {
	directory: DirectoryTree | string[];
	media: DirectoryTree | string[];
}

export { DirectoryTree, ParseResult };