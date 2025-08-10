import fs from "node:fs";
import { index } from "../content/index.js";
import path from "path"
import { contentEnv } from "../content/env.js";

export const generate = (pathName: string[], variant: string) => {
  try {

    const filePath = path.join(process.cwd(), ".env");

    fs.writeFileSync(filePath, contentEnv, "utf8");

    //Criando pasta src
    fs.mkdirSync("src", { recursive: true });
    process.chdir("src");

    //Criando servidor

    index(String(variant));

    for (let path in pathName) {
      fs.mkdirSync(pathName[path], { recursive: true });
    }
  } catch (err) {
    console.error(err);
  }
};
