import { Router } from "express";
import { usersRoute } from "./users-route";
import { sessionsRouter } from "./sessions-route";
import { deliveryRoute } from "./delivery-route";
import { deliveryLogsRoute } from "./delivery-route-logs";

const routes = Router();

routes.use("/users",usersRoute);

routes.use("/sessions",sessionsRouter);

routes.use("/delivery",deliveryRoute);

routes.use("/delivery/logs",deliveryLogsRoute);

export {routes}