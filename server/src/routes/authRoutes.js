import { Router } from "express";
import { register,logout, login, checkAuth} from "../controllers/authController.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get('/check', checkAuth);
router.post("/logout", logout); 

export default router;
