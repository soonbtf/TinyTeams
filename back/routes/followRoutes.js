import express from "express";
import auth from "../middleware/auth.js";
import followController from "../controllers/followController.js";

const router = express.Router();

router.post("/follow/:userId", auth, followController.create);
router.get(
  "/follow/getOne/:author/:followedUser",
  auth,
  followController.getOne
);
router.get("/follow/getAll/:userId", auth, followController.getAll);
router.delete("/unfollow/:followId", auth, followController.delete);

export default router;
