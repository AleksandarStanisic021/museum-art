const express = require("express");
const members = require("../../Members");
const tree = require("../../Tree");
const collection = require("../../Collection");

const router = express.Router();

router.get("/", (req, res) => {
  res.json(members);
});

console.log(tree);
console.log(collection);
//get single member
router.get("/:id", (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));
  found
    ? res.json(
        members.filter((member) => member.id === parseInt(req.params.id))
      )
    : res
        .status(400)
        .json({ msg: `no member with id of ${req.params.id} found!` });
});

router.post("/", (req, res) => {
  const newMember = {
    id: Math.random(),
    name: req.body.name,
    email: req.body.email,
    status: "active",
  };
  members.push(newMember);
  res.json(newMember);
});

router.put("/:id", (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));
  if (found) {
    const updMem = req.body;
    members.forEach((member) => {
      if (member.id === parseInt(req.params.id)) {
        member.name = updMem.name;
        member.email = updMem.email;
        res.json(member);
      }
    });
  } else {
    res
      .status(400)
      .json({ msg: `no member with id of ${req.params.id} found!` });
  }
});

router.delete("/:id", (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));
  found
    ? res.json({
        members: members.filter(
          (member) => member.id !== parseInt(req.params.id)
        ),
      })
    : res
        .status(400)
        .json({ msg: `no member with id of ${req.params.id} found!` });
});

module.exports = router;
