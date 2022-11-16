import { Request, Response } from "express";
import { UpdateDeliveryDateUseCase } from "./UpdateDeliveryDateUseCase";

export class UpdateDeliveryDateController {

    async handle(request: Request, response: Response) {

        const { id_deliveryman } = request;
        const { id: id_delivery } = request.params;

        const updateDeliveryDateUseCase = new UpdateDeliveryDateUseCase();
        const delivery = await updateDeliveryDateUseCase.execute({ id_delivery, id_deliveryman });

        return response.json(delivery);
    }
}