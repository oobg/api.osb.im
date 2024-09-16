import "dotenv/config";
import { join } from "path";

const getTarget = (): string => {
	const projectRoot = process.cwd();
	return join(projectRoot, process.env.GIT_DIR);
}

export default {
	getTarget,
}