

const express = require("express");
const { addMember, memberBooks } = require("../controllers/member.controller");

const memberRouter = express.Router();

memberRouter.post("/add", addMember);
memberRouter.get("/member-borrowed-books/:memberId", memberBooks);

module.exports = memberRouter;
