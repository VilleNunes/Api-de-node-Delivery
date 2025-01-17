import { Request,Response,NextFunction } from "express";
import { AppError } from "../utils/AppError";
import { ZodError } from "zod";

export function errorHandler(
  error:any,
  req:Request,
  res:Response,
  next:NextFunction):any
  {
  if(error instanceof AppError){
    return res.status(error.code).json({message:error.message});
  }

  if(error instanceof ZodError){
    return res.status(400).json({
      message: "Error de validação",
      issues: error.format()
    })
  }

  return res.status(500).json({message:error.message})
}