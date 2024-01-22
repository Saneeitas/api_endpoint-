const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/users/exact", userController.getUsersExact);
router.get("/users/regex", userController.getUsersRegex);
router.get("/users/by-dateAdded", userController.getUsersByDateAdded);
router.get("/users/by-firstName", userController.getUsersByFirstName);
router.get("/users/by-lastName", userController.getUsersByLastName);
router.post("/users/:userId/posts", userController.addPostToUser);

module.exports = router;
