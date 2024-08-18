import { join } from "path";
import { exec } from "child_process";
import "dotenv/config";
import os from "os";
import { existsSync, rmSync } from "fs";

const gitInstall = (): Promise<void> => {
	return new Promise((resolve, reject) => {
		const platform = os.platform();
		let installCommand: string;

		if (platform === "linux") {
			const distro = getLinuxDistro();
			if (distro === "alpine") {
				installCommand = "apk add git";
			} else {
				installCommand = "sudo apt-get update && sudo apt-get install git -y";
			}
		} else if (platform === "darwin") {
			installCommand = "brew install git";
		} else if (platform === "win32") {
			reject("Please install Git manually from https://git-scm.com/download/win");
			return;
		} else {
			reject(`Unsupported platform: ${platform}`);
			return;
		}

		exec(installCommand, (error, stdout, stderr) => {
			if (error) {
				reject(`Error installing Git: ${error.message}`);
				return;
			}
			if (stderr) {
				console.error(`stderr: ${stderr}`);
			}
			console.log(`stdout: ${stdout}`);
			console.log("Git installation completed successfully.");
			resolve();
		});
	});
}

const getLinuxDistro = () => {
	const distro = os.release().toLowerCase();
	if (distro.includes("alpine")) {
		return "alpine";
	} else if (distro.includes("ubuntu") || distro.includes("debian")) {
		return "ubuntu";
	} else {
		return "unknown";
	}
}

const gitClone = (): Promise<string> => {
	return new Promise((resolve, reject) => {
		const projectRoot = process.cwd();
		const targetDir = join(projectRoot, "src", process.env.GIT_DIR);

		if (existsSync(targetDir)) {
			resolve(`Directory already exists, Skipping clone.`);
			return;
		}

		const gitCommand = `git clone ${process.env.GIT_URL} ${targetDir}`;

		exec(gitCommand, (error, stdout, stderr) => {
			if (error) {
				console.error(`Error cloning repository: ${error.message}`);
				reject(new Error(`Error cloning repository: ${error.message}`));
				return;
			}

			if (stderr) {
				console.log(`Git Message: ${stderr}`);
			}

			console.log(`Repository cloned successfully: ${stdout}`);
			resolve(`Repository cloned successfully: ${stdout}`);
		});
	});
}

const gitVersionCheck = (): Promise<void> => {
	return new Promise((resolve, reject) => {
		exec('git --version', (error, stdout, stderr) => {
			if (error) {
				reject(`Git is not installed: ${stderr}`);
				return;
			}
			resolve();
		});
	});
}

export {
	gitVersionCheck,
	gitInstall,
	gitClone,
}