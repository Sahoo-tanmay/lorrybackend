import mongoose, { Document, Schema } from "mongoose";

export interface ILorry extends Document {
  truckNo: string;
  ownerName: string;
  lorryModel?: string;
  capacityInTons?: number;
  registrationDate?: Date;
  phone: string;
  email?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const LorrySchema: Schema = new Schema<ILorry>(
  {
    truckNo: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    ownerName: {
      type: String,
      required: true,
      trim: true,
    },
    lorryModel: {
      type: String,
    },
    capacityInTons: {
      type: Number,
    },
    registrationDate: {
      type: Date,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Lorry = mongoose.model<ILorry>("Lorry", LorrySchema);

export default Lorry;
