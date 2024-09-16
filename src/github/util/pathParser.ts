import { existsSync } from "fs";
import "dotenv/config";
import { DirectoryTree, ParseResult } from "../../@types/board";
import dir from "./directory";

const mediaRoot: string = "media";

// 디렉토리 경로에서 gitDir의 위치를 찾고, 해당 경로 이후 부분을 반환
const extractPartsFromPath = (filePath: string, gitDirectory: string): string[] | null => {
	const cloneIndex = filePath.split("/").indexOf(gitDirectory);
	if (cloneIndex === -1) return null;
	return filePath.split("/").slice(cloneIndex + 1);
};

// 파일 경로를 디렉토리 트리에 추가하는 함수
const addToTree = (parts: string[], tree: DirectoryTree, isMedia: boolean): void => {
	let currentLevel: DirectoryTree = tree;

	// media 폴더일 경우 최상단 "media" 레벨을 제거
	const startIndex = isMedia && parts[0] === mediaRoot ? 1 : 0;

	parts.slice(startIndex).forEach((part, index) => {
		if (index === parts.length - startIndex - 1) {
			// 마지막 부분이면 파일이므로 배열에 추가
			if (!Array.isArray(currentLevel)) {
				if (!currentLevel[part]) {
					currentLevel[part] = [];
				} else if (!Array.isArray(currentLevel[part])) {
					currentLevel[part] = [];
				}
				(currentLevel[part] as string[]).push(part);
			} else {
				currentLevel.push(part);
			}
		} else {
			// 디렉토리라면 객체로 생성
			if (!currentLevel[part]) {
				currentLevel[part] = {};
			} else if (Array.isArray(currentLevel[part])) {
				currentLevel[part] = {};
			}
			currentLevel = currentLevel[part] as DirectoryTree;
		}
	});
};

// 객체 내에서 배열로 변환 가능한 부분을 배열로 변환하는 함수
const convertToArrayIfNeeded = (obj: DirectoryTree): DirectoryTree | string[] => {
	const keys = Object.keys(obj);
	if (keys.every((key) => Array.isArray(obj[key]))) {
		return keys.reduce((arr, key) => arr.concat(obj[key] as string[]), [] as string[]);
	}

	for (const key in obj) {
		if (typeof obj[key] === "object" && !Array.isArray(obj[key])) {
			obj[key] = convertToArrayIfNeeded(obj[key] as DirectoryTree);
		}
	}

	return obj;
};

// buildTree 함수는 각 경로에 따라 트리를 빌드하는 역할만 담당
const buildTree = (
	paths: string[]
): { media: DirectoryTree; directory: DirectoryTree } => {
	const tree: DirectoryTree = {};
	const mediaTree: DirectoryTree = {};
	const gitDir = process.env.GIT_DIR as string;

	paths.forEach((filePath) => {
		const parts = extractPartsFromPath(filePath, gitDir);
		if (!parts) return;

		// media 폴더는 1뎁스를 제거하여 추가
		const currentTree = parts[0] === mediaRoot ? mediaTree : tree;
		addToTree(parts, currentTree, parts[0] === mediaRoot);
	});

	return {
		media: convertToArrayIfNeeded(mediaTree) as DirectoryTree,
		directory: convertToArrayIfNeeded(tree) as DirectoryTree,
	};
};

const parser = (): ParseResult => {
	const targetDir: string = dir.getTarget();

	if (!existsSync(targetDir)) {
		throw new Error(`Directory not found: ${targetDir}`);
	}

	const files = dir.parse(targetDir);
	const { media, directory } = buildTree(files);

	return { media, directory };
};

export { parser };