import { Request,Response,NextFunction } from "express";
import {AppError} from "../utils/AppError"

export function validadHandler(role: string[]){
  return (req:Request, res:Response, next:NextFunction)=>{
    
    if(!req.user){
      throw new AppError("Usuário não autenticado",401)
    }

    if(!role.includes(req.user.role)){
      console.log(req.user.role)
      throw new AppError("Usuario não autorizado",401)
    }

    next();
  }
}

