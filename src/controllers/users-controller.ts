import { Request,Response,NextFunction } from "express";
import { prisma } from "../database/prisma";
import { AppError } from "../utils/AppError";
import  {hash}  from "bcrypt";
import {z} from "zod"

export class UsersController{
  async create(req: Request, res: Response,next: NextFunction):Promise<any>{
    try {
      
    const schemaBody = z.object({
      name: z.string().trim().min(3).max(50),
      email: z.string().email(),
      password: z.string().min(8).trim(),
    });
    const {name,email,password} = schemaBody.parse(req.body);

    const userEmail = await prisma.user.findFirst({where: {email}});

    if(userEmail){
      throw new AppError("Já existe um usúario com esse email cadastrado")
    }

    const hashCrypto = await hash(password,8);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashCrypto
      }
    })

    const {password:_,...userInfo} = user

    return res.status(201).json(userInfo)
    } catch (error) {
      next(error)
    }
  }
}