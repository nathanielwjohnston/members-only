const { Router } = require("express");
const controller = require("../controllers/controller");
const router = Router();

router.get("/", controller.homeGet);

router.get("/register", controller.registerGet);
router.post("/register", controller.registerPost);

router.get("/login", controller.loginGet);
router.post("/login", controller.loginPost);

router.get("/join-club", controller.joinClubGet);
router.post("/join-club", controller.joinClubPost);

router.get("/createMessage", controller.createMessageGet);
router.post("/createMessage", controller.createMessagePost);

router.post("/:id/delete", controller.deleteMessage);

module.exports = router;
