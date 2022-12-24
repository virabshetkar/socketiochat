import { Router } from "express";
import { MessageModel, UpdateModel } from "socket-io-db/db/schemas";

const router = Router();

router.get("/", async (req, res) => {
	const updates = await UpdateModel.find({ to: "global-chatroom" }).sort({ timestamp: -1 }).limit(100);
	updates.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
	console.log(updates);
	return res.json(updates);
});

export default router;
