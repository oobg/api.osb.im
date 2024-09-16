import "dotenv/config";
import { join } from "path";
import { readdirSync, statSync } from "fs";

const excludedFiles = ["README.md"];
const excludedPatterns = [/^\./, /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\.md$/]; // 점(.)으로 시작하는 디렉토리와 IP 패턴

const getTarget = (): string => {
	const projectRoot = process.cwd();
	return join(projectRoot, process.env.GIT_DIR);
}

const parse = (directory: string): string[] => {
	let results: string[] = [];
	const list = readdirSync(directory);

	for (const file of list) {
		const fullPath = join(directory, file);
		const stat = statSync(fullPath);

		if (stat && stat.isDirectory()) {
			if (!excludedPatterns.some((pattern) => pattern.test(file))) {
				results = results.concat(parse(fullPath));
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

export default {
	getTarget,
	parse,
}