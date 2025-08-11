export const additionalFiles: Record<string, string> = {
  ".prettierrc.json": JSON.stringify(
    {
      semi: true,
      singleQuote: true,
      trailingComma: "all",
      printWidth: 80,
      tabWidth: 2,
      useTabs: false,
      bracketSpacing: true,
      arrowParens: "always",
      endOfLine: "lf",
      jsxSingleQuote: false,
    },
    null,
    2
  ),
  ".eslintrc.json": JSON.stringify(
    {
      env: {
        browser: true,
        es2024: true,
        node: true,
      },
      parser: "@typescript-eslint/parser",
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: "./tsconfig.json",
      },
      plugins: ["@typescript-eslint", "import"],
      extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:import/recommended",
        "plugin:import/typescript",
        "prettier",
      ],
      rules: {
        "import/order": [
          "error",
          {
            groups: [
              ["builtin", "external"],
              "internal",
              ["parent", "sibling", "index"],
            ],
            alphabetize: { order: "asc", caseInsensitive: true },
          },
        ],
        "@typescript-eslint/no-unused-vars": [
          "error",
          { argsIgnorePattern: "^_" },
        ],
        "@typescript-eslint/explicit-function-return-type": "off",
        "no-console": "warn",
      },
    },
    null,
    2
  ),
};

//Arquivo de configuração de envio de email
export const generateConfigMail = (variant: string) => {
  if(variant === "ts"){
const fileSend = `
import nodemailer, { SendMailOptions } from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

//Criando transporter para envio de email
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.APP_PASS,
  },
});

//Criando corpo de envio
export const sendResetPass = async (
  to: string,
  resetLink: string,
): Promise<boolean> => {
  const mailOption: SendMailOptions = {
    from: process.env.USER_EMAIL,
    to,
    subject: "Assunto do E-mail aqui",
    text: "Conteúdo do E-mail aqui, mude de text para html caso queira"
  };

  try {
    await transporter.sendMail(mailOption);
    return true;
  } catch (error: any) {
    console.log(error);
    return false;
  }
};

`
return fileSend
  }
  else{
const fileSend = `
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

//Criando transporter para envio de email
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.APP_PASS,
  },
});

//Criando corpo de envio
export const sendResetPass = async (
  to: string,
  resetLink: string,
) => {
  const mailOption = {
    from: process.env.USER_EMAIL,
    to,
    subject: "Assunto do E-mail aqui",
    text: "Conteúdo do E-mail aqui, mude de text para html caso queira"
  };

  try {
    await transporter.sendMail(mailOption);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

`
return fileSend;
  }
}
