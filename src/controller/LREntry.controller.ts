
// controllers/LREntry.controller.ts
import { NextFunction, Request, Response } from "express";
import mongoose, { PipelineStage } from "mongoose";

import Lorry from "../models/Lorry.model.js";
import LREntryModel, { ILREntry } from "../models/LREntry.model.js";

// Create LR Entry
export const createLREntry = async (req: Request, res: Response, next: NextFunction) => {
  try {
   const lorry = await Lorry.findOne({ truckNo: req.body.truckNo });

if (!lorry) {
  res.status(400).json({ success: false, message: `Lorry with truckNo ${req.body.truckNo} not found` });
  return;
}

    const newEntry = await LREntryModel.create(req.body);
     res.status(201).json({ success: true, data: newEntry });
     return
  } catch (error) {
    next(error);
     return
  }
};

// Get all LR Entries


export const getAllLREntries = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // parse pagination params
    const page: number = Math.max(1, parseInt(req.query.page as string, 10) || 1);
    const limit: number = Math.max(1, parseInt(req.query.limit as string, 10) || 10);
    const skip: number = (page - 1) * limit;

    // build match filter
    const match: Record<string, any> = {};
    if (req.query.truckNo) {
      match.truckNo = req.query.truckNo;
    }
    if (req.query.partyName) {
      // exact match; switch to regex for partial if needed
      match.partyName = req.query.partyName;
    }
    if (req.query.fromDate || req.query.toDate) {
      match.date = {};
      if (req.query.fromDate) {
        match.date.$gte = new Date(req.query.fromDate as string);
      }
      if (req.query.toDate) {
        // toDate inclusive: set time to end of day
        const to = new Date(req.query.toDate as string);
        to.setHours(23, 59, 59, 999);
        match.date.$lte = to;
      }
    }

    const pipeline: PipelineStage[] = [
      // apply filters first
      { $match: match },

      // then sort / paginate / count
      {
        $facet: {
          data: [
            { $sort: { date: -1 } },    // sort by date (or createdAt) descending
            { $skip: skip },
            { $limit: limit },
          ],
          meta: [
            { $count: 'total' },
          ],
        },
      },
      {
        $addFields: {
          total: { $arrayElemAt: ['$meta.total', 0] },
          page,
          limit,
        },
      },
      {
        $project: {
          meta: 0,
        },
      },
    ];

    // run aggregation
    const [result] = await LREntryModel.aggregate<{
      data: ILREntry[];
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
        hasNextPage: page * limit < total,
      },
    });
  } catch (error) {
    next(error);
  }
};



// Get LR Entry by ID
export const getLREntryById = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
     res.status(400).json({ success: false, message: "Invalid Entry ID" });
     return
  }
  try {
    const entry = await LREntryModel.findById(id);
    if (!entry) {
       res.status(404).json({ success: false, message: "LR entry not found" });
       return
    }
     res.status(200).json({ success: true, data: entry });
     return
  } catch (error) {
     res.status(500).json({ success: false, message: "Failed to get LR entry", error });
     return
  }
};

// Update LR Entry by ID
export const updateLREntry = async (req: Request, res: Response) => {
  const lorry = await Lorry.findOne({ truckNo: req.body.truckNo });

if (!lorry) {
  res.status(400).json({ success: false, message: `Lorry with truckNo ${req.body.truckNo} not found` });
  return;
}

  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
     res.status(400).json({ success: false, message: "Invalid Entry ID" });
     return
  }
  try {
    const updated = await LREntryModel.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) {
       res.status(404).json({ success: false, message: "LR entry not found" });
       return
    }
     res.status(200).json({ success: true, data: updated });
     return
  } catch (error) {
     res.status(500).json({ success: false, message: "Update failed", error });
     return
  }
};

// Delete LR Entry by ID
export const deleteLREntry = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
     res.status(400).json({ success: false, message: "Invalid Entry ID" });
     return
  }
  try {
    const deleted = await LREntryModel.findByIdAndDelete(id);
    if (!deleted) {
       res.status(404).json({ success: false, message: "LR entry not found" });
       return
    }
     res.status(200).json({ success: true, message: "LR entry deleted" });
     return
  } catch (error) {
     res.status(500).json({ success: false, message: "Delete failed", error });
     return
  }
};
