const express = require("express");
const {
  getARandomUser,
  getAllUser,
  addANewUser,
  deleteAUser,
  updateAUser,
} = require("../controllers/user.controller");

const router = express.Router();

router.get("/random", getARandomUser);
router.get("/all", getAllUser);
router.post("/save", addANewUser);
router.delete("/delete/:id", deleteAUser);
router.patch("/update/:id", updateAUser);

module.exports = router;
