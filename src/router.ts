import { Router } from "express";
import UserRoutes from "./api/User/User.routes";
const router = Router();

router.use("/user", UserRoutes);

export default router;
