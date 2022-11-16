import { Router } from "express";
import { ensureAuthenticateClient } from "./middlewares/ensureAuthenticateClient";
import { ensureAuthenticateDeliveryman } from "./middlewares/ensureAuthenticateDeliveryman";
import { AuthenticateClientController } from "./modules/auth/authenticateClient/AuthenticateClientController";
import { AuthenticateDeliverymanController } from "./modules/auth/authenticateDeliveryman/AuthenticateDeliverymanController";
import { CreateClientController } from "./modules/clients/useCases/createClient/CreateClientController";
import { FindAllDeliveriesController } from "./modules/clients/useCases/findAllDeliveries/FindAllDeliveriesController";
import { CreateDeliveryController } from "./modules/deliveries/useCases/createDelivery/CreateDeliveryController";
import { FindAllAvailableController } from "./modules/deliveries/useCases/findAllAvailable/FindAllAvailableController";
import { UpdateDeliveryController } from "./modules/deliveries/useCases/updateDelivery/UpdateDeliveryController";
import { CreateDeliverymanController } from "./modules/deliveryman/useCases/createDeliveryman/CreateDeliverymanController";
import { FindAllDeliverymanDeliveriesController } from "./modules/deliveryman/useCases/findAllDeliveries/FindAllDeliverymanDeliveriesController";
import { UpdateDeliveryDateController } from "./modules/deliveryman/useCases/updateDeliveryDate/UpdateDeliveryDateController";

const routes = Router();

const authenticateClientController = new AuthenticateClientController();
const authenticateDeliverymanController = new AuthenticateDeliverymanController();
const createClientController = new CreateClientController();
const createDeliverymanController = new CreateDeliverymanController();
const createDeliveryController = new CreateDeliveryController();
const findAllAvailableController = new FindAllAvailableController();
const updateDeliveryController = new UpdateDeliveryController();
const findAllDeliveriesController = new FindAllDeliveriesController();
const findAllDeliverymanDeliveriesController = new FindAllDeliverymanDeliveriesController();
const updateDeliveryDateController = new UpdateDeliveryDateController();

routes.post("/authenticate/client", authenticateClientController.handle);

routes.post("/authenticate/deliveryman", authenticateDeliverymanController.handle);

routes.post("/client", createClientController.handle);

routes.post("/deliveryman", createDeliverymanController.handle);

routes.post("/delivery", ensureAuthenticateClient, createDeliveryController.handle);

routes.get("/delivery/available", ensureAuthenticateDeliveryman, findAllAvailableController.handle);

routes.put("/delivery/update/:id", ensureAuthenticateDeliveryman, updateDeliveryController.handle);

routes.get("client/deliveries", ensureAuthenticateClient, findAllDeliveriesController.handle);

routes.get("deliveryman/deliveries", ensureAuthenticateDeliveryman, findAllDeliverymanDeliveriesController.handle);

routes.put("delivery/updateDeliveryDate/:id", ensureAuthenticateDeliveryman, updateDeliveryDateController.handle);

export { routes };