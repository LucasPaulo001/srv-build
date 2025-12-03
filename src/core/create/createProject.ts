import fs from "fs";
import path from "path";

export function createProjectFolder(projectName: string) {
  fs.mkdirSync(projectName, { recursive: true });

}

export function writeGitignore(content: string) {
  fs.writeFileSync(".gitignore", content, "utf8");
}

export function writeAdditionalFiles(additionalArchives: string[], additionalFiles: any) {
  for (const fileName of additionalArchives) {
    if (additionalFiles[fileName]) {
      fs.writeFileSync(fileName, additionalFiles[fileName], "utf8");
    }
  }
}
