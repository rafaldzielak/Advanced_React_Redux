import {
  BadRequestError,
  NotFoundError,
  OrderStatus,
  requireAuth,
  validateRequest,
} from "@rdticketing/common";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import mongoose from "mongoose";
import { Order } from "../models/order";
import { Ticket } from "../models/ticket";

const EXPIRATION_WINDOW_SECONDS = 15 * 60;

const router = express.Router();

router.post(
  "/api/orders",
  requireAuth,
  [
    body("ticketId")
      .not()
      .isEmpty()
      .custom((input: string) => mongoose.Types.ObjectId.isValid(input)) //check if a valid mongo id is provided
      .withMessage("TicketId must be provided"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { ticketId } = req.body;
    const ticket = await Ticket.findById(ticketId);
    if (!ticket) throw new NotFoundError();
    const isReserved = await ticket.isReserved();
    if (isReserved) throw new BadRequestError("Ticket is already reserved");
    const expirationDate = new Date();
    expirationDate.setSeconds(expirationDate.getSeconds() + EXPIRATION_WINDOW_SECONDS);
    const order = Order.build({
      expiresAt: expirationDate,
      userId: req.currentUser!.id,
      status: OrderStatus.AwaitingPayment,
      ticket: ticket,
    });
    await order.save();
    res.status(201).send(order);
  }
);

export { router as newOrderRouter };
