const { Router } = require("express");
const controller = require("../controllers/controller");
const router = Router();

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).send("You are not permitted to view this. Please log in");
  }
}

router.get("/", controller.homeGet);

router.get("/register", controller.registerGet);
router.post("/register", controller.registerPost);

router.get("/login", controller.loginGet);
router.post("/login", controller.loginPost);

router.get("/join-club", isAuthenticated, controller.joinClubGet);
router.post("/join-club", controller.joinClubPost);

router.get("/create-message", isAuthenticated, controller.createMessageGet);
router.post("/create-message", controller.createMessagePost);

router.post("/:id/delete", controller.deleteMessage);

module.exports = router;
