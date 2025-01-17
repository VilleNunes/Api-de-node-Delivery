import { Router } from "express";
import { DeliveryController } from "../controllers/delivery-controller";
import {authToken} from "../midlleware/authToken"
import { validadHandler } from "../midlleware/validadHandler";
import { DeliveryStatusController } from "../controllers/delivery-status";




const deliveryRoute = Router();
const deliveryController = new DeliveryController();
const deliverStatusController = new DeliveryStatusController();

deliveryRoute.use(authToken,validadHandler(["ADMIN"]));
deliveryRoute.post("/",deliveryController.create);
deliveryRoute.get("/",deliveryController.index)
deliveryRoute.patch("/:id/status",deliverStatusController.update);

export {deliveryRoute}