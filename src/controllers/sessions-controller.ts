import {compare} from "bcrypt"
import {Request,Response,NextFunction} from "express"
import { z } from "zod"
import {sign} from "jsonwebtoken";
import { prisma } from "../database/prisma";
import { AppError } from "../utils/AppError";
import { authConfig } from "../configs/auth";

class SessionsController {
  async create(req:Request, res:Response, next:NextFunction):Promise<any>{
    try {
      const schemaBoyd = z.object({
        email: z.string().email(),
        password: z.string().min(8).trim()
      });
  
      const {email,password} = schemaBoyd.parse(req.body);
  
      const user = await prisma.user.findFirst({where: {email}});
     
      if(!user){
        throw new AppError("Email ou senha inválidos",401)
      }
  
      const isValidPassword = await compare(password, user.password);
  
      if(!isValidPassword){
        throw new AppError("Email ou senha inválidos",401)
      }
      const {secret,expiresIn} = authConfig.jwt
      const token = sign({role: user.role ?? "USER"},secret,{
        subject: user.id,
        expiresIn: expiresIn
      });
      const {password: _,...userInfo} = user
     return res.json({token,...userInfo})
    } catch (error) {
      next(error)
    }
  }
}

export {SessionsController}