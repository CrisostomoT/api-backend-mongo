const express = require("express")
const { addUser, getUser, getAllUsers, removeUser, updateUser } = require('../controllers/user')

const router = express.Router()

router.get("/user/:_id", getUser);
router.get("/users/", getAllUsers);

router.post("/user", addUser);

router.put("/user/:_id", updateUser);

router.delete("/user/:_id", removeUser);

module.exports = router;