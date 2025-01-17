import { NextFunction, Request,Response, } from "express";
import { z } from "zod";
import { prisma } from "../database/prisma";
import { AppError } from "../utils/AppError";

export class DeliveryController{
  async create(req:Request, res:Response,next:NextFunction):Promise<any>{
    try {
      const schemaBody = z.object({
        idUser: z.string().uuid(),
        descricao: z.string().min(3)
      });
  
      const {idUser, descricao} = schemaBody.parse(req.body);

      const user = await prisma.user.findFirst({
        where: { id: idUser }
      });

      if(!user){
        throw new AppError("Cliente não encontrado", 404);
      }
  
      await prisma.delivery.create({
        data:{
          userId: idUser,
          descricao
        }
      });
      return res.status(201).send();
    } catch (error) {
      next(error)
    }
  }

  async index(req: Request,res:Response,next:NextFunction):Promise<any>{
    const delivery = await prisma.delivery.findMany({
      include:{
        user: {
          select:{
            name: true,
            email:true,
          }
        }
      },
    });

    return res.json({delivery});
  }
}