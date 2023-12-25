import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import * as DrawingController from './drawings.controller';
import { drawingUpdateValidationSchema, drawingValidationSchema } from "./drawings.validation";

const router = Router();

router.post('/drawings', validateRequest(drawingValidationSchema), DrawingController.createDrawing);

router.get('/drawings/:id', DrawingController.getDrawing);

router.get('/drawings', DrawingController.getDrawings);

router.put('/drawings/:id', validateRequest(drawingUpdateValidationSchema), DrawingController.updateDrawing);

router.delete('/drawings/:id', DrawingController.deleteDrawing);

export const DrawingRoutes = router;