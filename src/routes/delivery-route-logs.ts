import { Router } from "express";
import {validadHandler} from "../midlleware/validadHandler"
import {authToken} from "../midlleware/authToken"
import { DeliveryLogsController } from "../controllers/delivery-logs-controller";

const deliveryLogsRoute = Router();

const deliveryLogsController = new DeliveryLogsController();

deliveryLogsRoute.post("/",authToken,validadHandler(["ADMIN"]),deliveryLogsController.create);
deliveryLogsRoute.get("/:id_delivery",authToken,validadHandler(["ADMIN","USER"]),deliveryLogsController.show);

export {deliveryLogsRoute}