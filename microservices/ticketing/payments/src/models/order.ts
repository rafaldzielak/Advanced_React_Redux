import { OrderStatus } from "@rdticketing/common";
import mongoose from "mongoose";

interface OrderAttrs {
  id: string;
  status: OrderStatus;
  version: number;
  userId: string;
  price: number;
}

interface OrderDoc extends mongoose.Document {
  status: OrderStatus;
  version: number;
  userId: string;
  price: number;
}

interface OrderModel extends mongoose.Model<OrderDoc> {
  build(attrs: OrderAttrs): OrderDoc;
}

const orderSchema = new mongoose.Schema(
  {
    status: { type: String, required: true },
    userId: { type: String, required: true },
    price: { type: Number, required: true },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

orderSchema.statics.build = (attrs: OrderAttrs) => {
  return new Order({ _id: attrs.id, version: attrs.version, price: attrs.price, userId: attrs.userId });
};

const Order = mongoose.model<OrderDoc, OrderModel>("Order", orderSchema);

export { Order };
