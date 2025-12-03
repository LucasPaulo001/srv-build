export const jwtDefault = (variant: symbol | 'js' | 'ts'): string => {
  if (variant === 'ts') {
    return `
import jwt from "jsonwebtoken";
//import User from "../models/User.js"; // Model de Usuário aqui
import dotenv from "dotenv";
dotenv.config();
import { type Request, type Response, type NextFunction } from "express";

const JWT_SECRET = process.env.JWT_SECRET;

// Custom Request para incluir tipagem de usuário
export interface CustomRequest extends Request {
  user?: any;
}

export const authGuard = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      Erro: "Token inválido!",
    });
  }

  try {
    if (!JWT_SECRET) {
      console.error("Erro ao acessar a variável de ambiente 'JWT_SECRET'");
      return;
    }

    const verification = jwt.verify(token, JWT_SECRET) as { id: string };

    // Aqui fica a busca do usuário 
    // const user = await User.findById(verification.id).select("-senha");

    // if(!user){
    //     return res.status(422).json({
    //         Erro: "Usuário não encontrado!"
    //     });
    // };
    
    // Setando dados do usuário na requisição req.user
    // req.user = user;

    return next();

  } catch (error: any) {
    return res.status(500).json({
      Erro: "Erro interno do servidor!",
    });
  }
};
`;
  } else if (variant === 'js') {
    return `

import jwt from "jsonwebtoken";
//import User from "../models/User.js"; // Model de Usuário aqui
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;


export const authGuard = async (
  req,
  res,
  next
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      Erro: "Token inválido!",
    });
  }

  try {
    if (!JWT_SECRET) {
      console.error("Erro ao acessar a variável de ambiente 'JWT_SECRET'");
      return;
    }

    const verification = jwt.verify(token, JWT_SECRET);

    // Aqui fica a busca do usuário 
    // const user = await User.findById(verification.id).select("-senha");

    // if(!user){
    //     return res.status(422).json({
    //         Erro: "Usuário não encontrado!"
    //     });
    // };

    // Setando dados do usuário na requisição req.user
    // req.user = user;

    return next();

  } catch (error) {
    return res.status(500).json({
      Erro: "Erro interno do servidor!",
    });
  }
};

`;
  }

  return `//Arquivo para configuração de jwt`;
};