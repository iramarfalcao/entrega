import { Router } from "express";
import { AuthenticateClientController } from "./modules/auth/authenticateClient/AuthenticateClientController";
import { AuthenticateDeliverymanController } from "./modules/auth/authenticateDeliveryman/AuthenticateDeliverymanController";
import { CreateClientController } from "./modules/clients/CreateClientController";
import { CreateDeliverymanController } from "./modules/deliveryman/CreateDeliverymanController";

const routes = Router();

const authenticateClientController = new AuthenticateClientController();
const authenticateDeliverymanController = new AuthenticateDeliverymanController();
const createClientController = new CreateClientController();
const createDeliverymanController = new CreateDeliverymanController();

routes.post("/authenticate/client", authenticateClientController.handle);

routes.post("/authenticate/deliveryman", authenticateDeliverymanController.handle);

routes.post("/client", createClientController.handle);

routes.post("/deliveryman", createDeliverymanController.handle);

export { routes };