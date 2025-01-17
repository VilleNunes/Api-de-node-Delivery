import { Request,Response,NextFunction } from "express";
import { z } from "zod";
import { prisma } from "../database/prisma";


export class DeliveryStatusController {
  async update(req:Request, res:Response, next:NextFunction):Promise<any>{
    try {
      const schemaParams = z.object({
        id: z.string().uuid()
      });
  
      const schemaBody = z.object({
        status: z.enum(["PROCESSANDO","ENVIADO","ENTREGUE"]) 
      });
  
      const {id} = schemaParams.parse(req.params);
      const {status} = schemaBody.parse(req.body);
  
      await prisma.delivery.update({
        data:{
          status,
        },
        where:{
          id
        }
      })

      return res.json();
    }catch (error) {
      next(error)
    }
  }
}