import { requireAuth, validateRequest } from "@rdticketing/common";
import express, { Response, Request } from "express";
import { body } from "express-validator";

const router = express.Router();

router.post(
  "/api/payments",
  requireAuth,
  [body("token").not().isEmpty(), body("orderId").not().isEmpty()],
  validateRequest,
  (req: Request, res: Response) => {
    res.send({ success: true });
  }
);

export { router as createChargeRouter };
