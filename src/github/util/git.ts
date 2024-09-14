import { join } from "path";
import simpleGit, { SimpleGit } from "simple-git";
import "dotenv/config";
import { existsSync } from "fs";

// Git 인터페이스 초기화
const git: SimpleGit = simpleGit();

// Git 리포지토리 클론 함수
const gitClone = async (): Promise<string> => {
	const projectRoot = process.cwd();
	const targetDir = join(projectRoot, "src", process.env.GIT_DIR || "."); // 기본 경로를 상위 프로젝트로 설정

	// 디렉토리가 존재하면 클론을 건너뛴다
	if (existsSync(targetDir)) {
		console.log("Directory already exists, skipping clone.");
		return `Directory already exists: ${targetDir}`;
	}

	const repoUrl = process.env.GIT_URL;
	if (!repoUrl || !process.env.GIT_DIR) {
		throw new Error("Missing GIT_URL or GIT_DIR in environment variables.");
	}

	try {
		await git.clone(repoUrl, targetDir);
		console.log(`Repository cloned successfully to ${targetDir}`);
		return `Repository cloned successfully to ${targetDir}`;
	} catch (error) {
		console.error(`Error cloning repository: ${error.message}`);
		throw error;
	}
};

// Git 히스토리 가져오기 함수
const gitHistory = async (limit: number = 10): Promise<any> => {
	const projectRoot = process.cwd();
	const targetDir = join(projectRoot, "src", process.env.GIT_DIR || "clone"); // 상위 프로젝트의 루트로 설정

	// .git 폴더 확인
	if (!existsSync(join(targetDir, ".git"))) {
		console.error(".git directory does not exist in target directory:", targetDir);
		return;
	}

	// 상위 Git 리포지토리 경로로 이동
	const gitRepo = simpleGit(targetDir);

	try {
		// Git 로그 옵션 설정
		const logOptions = {
			maxCount: limit,
			format: {
				hash: '%H',
				date: '%ai',
				message: '%s',
				author_name: '%an',
				author_email: '%ae',
			},
		};

		const logResult = await gitRepo.log(logOptions);
		console.log("Git log fetched successfully:", logResult);
		return logResult;
	} catch (error) {
		console.error("### Error fetching Git log:", error);
	}
};

export {
	gitClone,
	gitHistory,
};