//Gerando router
export const generateRouter = (variant: string): string => {
  if (variant === 'ts') {
    const routes = `
import express, { type Request, type Response } from "express";
const router = express.Router();

router.get("/", (req: Request, res: Response) => {
    res.send("Hello, node!");
});


export default router;

`;
    return routes;
  } else {
    const routes = `
import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
    res.send("Hello, node!");
});


export default router;

`;
    return routes;
  }
};
