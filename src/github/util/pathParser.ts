import { join } from "path";
import { readdirSync, statSync, existsSync } from "fs";
import * as process from "node:process";
import { DirectoryTree, ParseResult } from "../../@types/board";

const excludedFiles = ["README.md"];
const excludedPatterns = [/^\./, /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\.md$/]; // 점(.)으로 시작하는 디렉토리와 IP 패턴

const parseDirectory = (dir: string): string[] => {
	let results: string[] = [];
	const list = readdirSync(dir);

	for (const file of list) {
		const fullPath = join(dir, file);
		const stat = statSync(fullPath);

		if (stat && stat.isDirectory()) {
			if (!excludedPatterns.some((pattern) => pattern.test(file))) {
				results = results.concat(parseDirectory(fullPath));
			}
		} else {
			if (
				!excludedFiles.includes(file) &&
				!excludedPatterns.some((pattern) => pattern.test(file))
			) {
				results.push(fullPath);
			}
		}
	}

	return results;
};

const buildTree = (
	paths: string[]
): { mediaTree: DirectoryTree; directoryTree: DirectoryTree } => {
	const tree: DirectoryTree = {};
	const mediaTree: DirectoryTree = {};

	paths.forEach((filePath) => {
		const gitDir = process.env.GIT_DIR;
		const cloneIndex = filePath.split("/").indexOf(gitDir);
		if (cloneIndex === -1) return;

		const parts = filePath.split("/").slice(cloneIndex + 1);

		let currentLevel: DirectoryTree;

		// 미디어 파일은 mediaTree에 추가, 그 외는 directoryTree에 추가
		if (parts[0] === "media") {
			currentLevel = mediaTree;
		} else {
			currentLevel = tree;
		}

		parts.forEach((part, index) => {
			if (index === parts.length - 1) {
				// 마지막 부분이면 파일이므로 배열에 추가
				if (!Array.isArray(currentLevel)) {
					if (!currentLevel[part]) {
						currentLevel[part] = [];
					} else if (!Array.isArray(currentLevel[part])) {
						// 이전에 객체로 되어 있었던 것을 배열로 변환
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
					// 이전에 배열로 되어 있었던 것을 객체로 변환
					currentLevel[part] = {};
				}
				currentLevel = currentLevel[part] as DirectoryTree;
			}
		});
	});

	// 객체 내에서 배열로 변환 가능한 부분을 배열로 변환
	const convertToArrayIfNeeded = (
		obj: DirectoryTree
	): DirectoryTree | string[] => {
		const keys = Object.keys(obj);
		if (keys.every((key) => Array.isArray(obj[key]))) {
			return keys.reduce(
				(arr, key) => arr.concat(obj[key] as string[]),
				[] as string[]
			);
		}

		for (const key in obj) {
			if (typeof obj[key] === "object" && !Array.isArray(obj[key])) {
				obj[key] = convertToArrayIfNeeded(obj[key] as DirectoryTree);
			}
		}

		return obj;
	};

	return {
		mediaTree: convertToArrayIfNeeded(mediaTree) as DirectoryTree,
		directoryTree: convertToArrayIfNeeded(tree) as DirectoryTree,
	};
};

const parser = (): ParseResult => {
	const projectRoot = process.cwd();
	const targetDir = join(projectRoot, "src", process.env.GIT_DIR);

	if (!existsSync(targetDir)) {
		throw new Error(`Directory not found: ${targetDir}`);
	}

	const files = parseDirectory(targetDir);
	console.log("Parsed files: ", files);
	const { mediaTree, directoryTree } = buildTree(files);
	const media = JSON.parse(JSON.stringify(mediaTree, null, 2));
	const directory = JSON.parse(JSON.stringify(directoryTree, null, 2));

	return { media, directory };
};

export { parser };