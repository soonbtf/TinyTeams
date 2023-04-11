import express from "express";
import auth from "../middleware/auth.js";
import followCtrl from "../controllers/followCtrl.js";

const router = express.Router();

router.post("/follow/:userId", auth, followCtrl.create);
router.get("/follow/getOne/:userId", auth, followCtrl.getOne);
router.get("/follow/getAll/:userId", auth, followCtrl.getAll);
router.delete("/unfollow/:followId", auth, followCtrl.delete);

export default router;
