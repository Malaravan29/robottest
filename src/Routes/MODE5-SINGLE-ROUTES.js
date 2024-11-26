import { Router } from "express";
import { singleFiveModeApi,getModeRobotId} from "../Controllers/MODE-5-SINGLE-API.js"

const router = Router();
router.post("/historys/save", singleFiveModeApi);
router.get("/historys/get", getModeRobotId);


export default router;
