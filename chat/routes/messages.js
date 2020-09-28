const express = require("express");
const router = express.Router();
const Joi = require("joi");

const Message = require("../models/message.js");

let validate = (body) => {
  const schema = Joi.object({
    message: Joi.string().min(5).required(),
    author: Joi.string()
      .regex(/^(\w)+\s{1}(\w)+$/)
      .required(),
  });
  const { error } = schema.validate(body);
  return error;
};

router.get("/", function (req, res, next) {
  Message.findAll().then((result) => {
    console.log(result);
    if (result[0] != 0) res.send(result);
    else return res.status(404).send("Error");
  });
});

router.get("/:ts", function (req, res, next) {
  Message.findAll({ where: { ts: req.params.ts } }).then((result) => {
    console.log(result[0]);
    if (result[0] != 0) res.send(result[0]);
    else return res.status(404).send("Message not found");
  });
});

router.post("/", function (req, res, next) {
  error = validate(req.body);
  if (error) return res.status(400).send(error);
  else {
    Message.create({
      message: req.body.message,
      author: req.body.author,
      ts: Date.now(),
    }).then((result) => {
      console.log(result);
      res.send(result);
    });
  }
});

router.put("/:ts", function (req, res, next) {
  error = validate(req.body);
  if (error) return res.status(400).send(error);
  else {
    Message.update(req.body, { where: { ts: req.params.ts } }).then(
      (result) => {
        if (result[0] != 0) res.send({ message: "Message updated" });
        else return res.status(404).send("Message not found");
      }
    );
  }
});

router.delete("/:ts", function (req, res, next) {
  Message.destroy({ where: { ts: req.params.ts } }).then((result) => {
    if (result === 0) return res.status(404).send("Message not found");
    else res.send("Message deleted");
  });
});

module.exports = router;
