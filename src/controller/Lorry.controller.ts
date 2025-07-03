import { NextFunction, Request, Response } from "express";
import { PipelineStage } from "mongoose";

import Lorry, { ILorry } from "../models/Lorry.model.js";

// Create Lorry
export const createLorry = async (req: Request, res: Response) => {
   try {
      const newLorry = await Lorry.create(req.body);
      res.status(201).json({ success: true, data: newLorry });
      return
   } catch (error) {
      res.status(500).json({ success: false, message: "Error creating lorry", error });
      return
   }
};


export const getAllLorries = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const page: number = Math.max(1, parseInt(req.query.page as string, 10) || 1);
    const limit: number = Math.max(1, parseInt(req.query.limit as string, 10) || 10);
    const skip: number = (page - 1) * limit;

    const pipeline: PipelineStage[] = [
      {
        $facet: {
          data: [
            { $sort: { createdAt: -1 } },
            { $skip: skip },
            { $limit: limit }
          ],
          meta: [{ $count: 'total' }]
        }
      },
      {
        $addFields: {
          total: { $arrayElemAt: ['$meta.total', 0] },
          page,
          limit
        }
      },
      { $project: { meta: 0 } }
    ];

    const [result] = await Lorry.aggregate<{
      data: ILorry[];
      total: number;
      page: number;
      limit: number;
    }>(pipeline);

    const data = result?.data || [];
    const total = result?.total || 0;

    res.status(200).json({
      success: true,
      data,
      pagination: {
        total,
        page,
        limit,
        hasPrevPage: page > 1,
        hasNextPage: page * limit < total
      }
    });
  } catch (error) {
    next(error);
  }
};


// Get Lorry by ID
export const getLorryById = async (req: Request, res: Response, next: NextFunction) => {
   const { id } = req.params;

   try {
      const lorry = await Lorry.findById(id);
      if (!lorry) {
         res.status(404).json({ success: false, message: "Lorry not found" });
         return
      }
      res.status(200).json({ success: true, data: lorry });
      return
   } catch (error) {
      next(error);
      return
   }
};

// Update Lorry by ID
export const updateLorry = async (req: Request, res: Response, next: NextFunction) => {
   const { id } = req.params;
   try {
      const payload = req.body;
      const updated = await Lorry.findByIdAndUpdate(id, payload, { new: true });
      if (!updated) {
         res.badRequest("Lorry not found");
         return
      }
      res.success(updated, "Lorry updated successfully");
      return
   } catch (error) {
      next(error);
      return
   }
};

// Delete Lorry by ID
export const deleteLorry = async (req: Request, res: Response, next: NextFunction) => {
   const { id } = req.params;

   try {
      const deleted = await Lorry.findByIdAndDelete(id);
      if (!deleted) {
         res.status(404).json({ success: false, message: "Lorry not found" });
         return
      }
      res.status(200).json({ success: true, message: "Lorry deleted" });
      return
   } catch (error) {
      next(error);
      return
   }
};
