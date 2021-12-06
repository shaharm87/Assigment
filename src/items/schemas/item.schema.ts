import * as mongoose from 'mongoose';

export const ItemSchema = new mongoose.Schema({
  createdAt: Number,
  customerId: String,
  invoiceId: String,
});
