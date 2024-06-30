import { Router } from "express";
const router = Router();
import { ToggleSubscription, GetUserChannelSubscriber, GetUserSubscribedChannel } from "../../controllers/subscription.controller.js";


// ----------------- Subscription's Routes -------------- START

router.patch("/toggle", ToggleSubscription);
router.get("/subscriber", GetUserChannelSubscriber);
router.get("/channel", GetUserSubscribedChannel);

// ----------------- Subscription's Routes -------------- END

export default router;