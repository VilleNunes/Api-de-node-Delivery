import { NextFunction,Response,Request } from "express";
import {prisma} from "../database/prisma"
import { AppError } from "../utils/AppError";
import { z } from "zod";


export class DeliveryLogsController {
  async create(req:Request,res:Response,next:NextFunction):Promise<any>{
    try {
      
    const schemaBody = z.object({
      idDelivery: z.string().uuid(),
      descricao: z.string()
    });
    const {idDelivery, descricao} = schemaBody.parse(req.body);

    const delivery = await prisma.delivery.findFirst({
      where: { id: idDelivery }
    })

    if(!delivery){
      throw new AppError("Pedido não encontrado",404)
    }

    if(delivery.status == "PROCESSANDO"){
      throw new AppError("Pedido ainda em processamento",401)
    }

    if(delivery.status == "ENTREGUE"){
      throw new AppError("Pedido Já foi entregue",404)
    }


    await prisma.deliveryLog.create({
      data:{
        deliveryId: idDelivery,
        description: descricao
      }
    })

    return res.send({message: "ok"})
    } catch (error) {
      next(error)
    }
  }

  async show(req:Request,res:Response,next:NextFunction):Promise<any>{
    try{
      const schemaParams = z.object({
        id_delivery: z.string().uuid()
      });
  
      const {id_delivery} = schemaParams.parse(req.params)
  
      
      const delivery = await prisma.delivery.findFirst({
        where:{
          id: id_delivery
        },
        include:{
          logs : true
        }
      })
  
      if(!delivery){
        throw new AppError("Pedido não encontrado",402);
      }
      console.log(req.user?.role)
      if(req.user?.role === "USER" && req.user?.id_user !== delivery.userId){
        throw new AppError("Não autorizado",401)
      }
  
  
      return res.json({
        delivery
      })
    }catch(error){
      next(error)
    }
  }
}