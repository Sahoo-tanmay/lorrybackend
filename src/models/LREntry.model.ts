import { Document, model, Schema } from 'mongoose';

export interface ILREntry extends Document {
  date: Date;
  lrNo: string;
  partyName: string;
  truckNo: string;
  ownerName: string;
  fromLocation: string;
  toLocation: string;
  weightMT: number;
  billingRatePerMT: number;
  totalBillingAmount: number;
  lorryHireRatePerMT: number;
  totalLorryHire: number;
  isBilled: boolean;
}

const LREntrySchema = new Schema<ILREntry>({
  date: { type: Date, default: Date.now },
  lrNo: { type: String, unique: true },
  partyName: { type: String, required: true },
  truckNo: { type: String, required: true,ref:"Lorry" },
  ownerName: { type: String, required: true },
  fromLocation: { type: String, required: true },
  toLocation: { type: String, required: true },
  weightMT: { type: Number, required: true },
  billingRatePerMT: { type: Number, required: true },
  totalBillingAmount: { type: Number, required: true },
  lorryHireRatePerMT: { type: Number, required: true },
  totalLorryHire: { type: Number, required: true },
  isBilled: { type: Boolean, default: false },
});


LREntrySchema.pre('save', function (next) {
  if (this.isNew && !this.lrNo) {
    const timestamp = Date.now().toString().slice(-6);
    this.lrNo = `LR-${timestamp}`;
  }
  next();
});

export default model<ILREntry>('LREntry', LREntrySchema);
