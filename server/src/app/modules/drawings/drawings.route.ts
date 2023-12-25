import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";

const router = Router();

router.post("/drawings", validateRequest)

export const DrawingRoutes = router;