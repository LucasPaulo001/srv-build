import { intro, select } from "@clack/prompts"
import { Database, ORM } from "../create/setupDB.js";

export const orm = async (database: Database) => {

    if(database === "none") return "none";
    if(database === "supabase") return "supabase-client";

    intro(`Deseja escolher um ORM para o ${String(database)}?`);

    let orm: ORM = "none";

    switch(database){

        case "mongodb":
            orm = await select({
                message: "Escolha a ORM:",
                options: [
                    { value: "mongoose", label: "Mongoose" }
                ]
            })
        break;

        case "postgresql":
            orm = await select({
                message: "Escolha a ORM",
                options: [
                    { value: "prisma", label: "Prisma" },
                    { value: "sequelize", label: "Sequelize" },
                    { value: "none", label: "Nenhum (driver pg puro)" }
                ]
            })
        break;
    }

    return orm;
}