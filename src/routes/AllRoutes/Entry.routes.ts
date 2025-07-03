import { Router } from "express";

import { createLorry, deleteLorry, getAllLorries, getLorryById, updateLorry } from "../../controller/Lorry.controller.js";
import { validateRequest } from "../../middlewares/validate.middleware.js";
import { lorrySchema } from "../../validations/lorry.validation.js";
import { createLREntry, deleteLREntry, getAllLREntries, getLREntryById, updateLREntry } from "../../controller/LREntry.controller.js";
import { LREntrySchema } from "../../validations/LRentries.validation.js";


const baseRouter = Router();

// lorry routes
baseRouter.post("/create-lorry", validateRequest(lorrySchema), createLorry);
baseRouter.get("/get-all-lorries", getAllLorries);
baseRouter.get("/get-lorry/:id", getLorryById);
baseRouter.patch("/update-lorry/:id", validateRequest(lorrySchema), updateLorry);
baseRouter.delete("/delete-lorry/:id", deleteLorry);


// LR Entry routes
baseRouter.post("/create-lr-entry", validateRequest(LREntrySchema), createLREntry);
baseRouter.get("/get-all-lr-entries", getAllLREntries);
baseRouter.get("/get-lr-entry/:id", getLREntryById);
baseRouter.patch("/update-lr-entry/:id", validateRequest(LREntrySchema), updateLREntry);
baseRouter.delete("/delete-lr-entry/:id", deleteLREntry);

export default baseRouter;
