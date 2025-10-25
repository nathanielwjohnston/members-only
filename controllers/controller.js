// TODO: Use LOCALS!

const { body, validationResult } = require("express-validator");
const db = require("../db/queries");
const pwManager = require("../lib/passwordUtils");

async function homeGet(req, res) {
  const messages = db.getMessages();

  // TODO: filter messages dependent on user status

  res.render("template", {
    page: "messages",
    title: "Messages",
  });
}
async function registerGet(req, res) {
  res.locals.errors = [];
  res.render("template", {
    page: "registerForm",
    title: "Register",
  });
}

const emptyErr = "must not be empty";
const alphaErr = "must only contain letters";
const lengthErr = "must be between 1 and 20 characters";

const validateUser = [
  body("firstName")
    .trim()
    .notEmpty()
    .withMessage(`First name ${emptyErr}`)
    .isAlpha(undefined, { ignore: " " })
    .withMessage(`First name ${alphaErr}`)
    .isLength({ min: 1, max: 20 })
    .withMessage(`First name ${lengthErr}`),
  body("lastName")
    .trim()
    .notEmpty()
    .withMessage(`Last name ${emptyErr}`)
    .isAlpha(undefined, { ignore: " " })
    .withMessage(`Last name ${alphaErr}`)
    .isLength({ min: 1, max: 20 })
    .withMessage(`Last name ${lengthErr}`),
  body("username")
    .trim()
    .notEmpty()
    .withMessage(`Username ${emptyErr}`)
    .isAlpha(undefined, { ignore: " " })
    .withMessage(`Username ${alphaErr}`)
    .isLength({ min: 1, max: 20 })
    .withMessage(`Username ${lengthErr}`),
  body("password")
    .trim()
    .notEmpty()
    .withMessage(`Password ${emptyErr}`)
    .isLength({ min: 10, max: 40 })
    .withMessage(`Password must be between 10 and 40 characters`),
  body("passwordConfirm")
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage("Passwords must match"),
  body("adminCheck"),
];

async function registerPost(req, res) {
  const {
    firstName,
    lastName,
    username,
    password,
    passwordConfirm,
    adminCheck,
  } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.locals.errors = errors.array();
    res.locals.values = {
      firstName,
      lastName,
      username,
      password,
      passwordConfirm,
      adminCheck,
    };
    return res.status(400).render("template", {
      page: "registerForm",
      title: "Register",
    });
  }

  const passwordHash = await pwManager.generateHash(password);

  const admin = adminCheck === "on";
  const membership = false;

  await db.insertUser(
    username,
    firstName,
    lastName,
    passwordHash,
    membership,
    admin
  );

  res.redirect("/");
}
async function loginGet(req, res) {}
async function loginPost(req, res) {}
async function joinClubGet(req, res) {}
async function joinClubPost(req, res) {}
async function createMessageGet(req, res) {}
async function createMessagePost(req, res) {}
async function deleteMessage(req, res) {}

module.exports = {
  homeGet,
  registerGet,
  registerPost: [validateUser, registerPost],
  loginGet,
  loginPost,
  joinClubGet,
  joinClubPost,
  createMessageGet,
  createMessagePost,
  deleteMessage,
};
