const express = require("express");
const tree = require("../../Tree");
const colection = require("../../Colection");

const router = express.Router();

router.get("/tree", (req, res) => {
  res.json(tree);
});

router.get("/tree/:id", (req, res) => {
  const filtered = tree.collection.filter((c) => c.id === req.params.id);
  console.log(filtered);
  res.json(filtered);
});

router.get("/colection/", (req, res) => {
  console.log(colection);
  res.json(colection);
});

//get single member this is ok
router.get("/colection/:id", (req, res) => {
  const filtered = colection.collection.filter((c) => c.id === req.params.id);
  console.log(filtered);
  res.json(filtered);
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
