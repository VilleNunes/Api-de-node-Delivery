import { Router } from "express";
import { UsersController } from "../controllers/users-controller";

const usersRoute = Router();
const usersController = new UsersController();

usersRoute.post("/",usersController.create);

export {usersRoute}