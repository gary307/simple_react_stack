var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var Expense = require("../models/Expense");

router.route("/test1").get(function(req, res, next) {
  // Comment out this line:
  res.send("api is working");
});

router.route("/test2").get(function(req, res, next) {
  res.json([
    {
      id: 1,
      username: "samsepi0l"
    },
    {
      id: 2,
      username: "D0loresH4ze"
    }
  ]);
});

router.route("/insert").post(function(req, res) {
  var expense = new Expense();

  expense.description = req.body.description;
  expense.amount = req.body.amount;
  expense.month = req.body.month;
  expense.year = req.body.year;
  expense.save(function(err) {
    if (err) res.send(err);
    res.send("Expense successfully added!");
  });
});

router.get("/getAll", function(req, res) {
  Expense.find().exec((err, Expense) => {
    if (err) {
      return res.json({ success: false, message: "Some Error" });
    }
    if (Expense.length) {
      return res.json({
        success: true,
        message: "Todo fetched by id successfully",
        Expense
      });
    } else {
      return res.json({
        success: false,
        message: "Todo with the given id not found"
      });
    }
  });
});

router.route("/delete").post(function(req, res) {
  // return res.json({ success: req.body.id });
  Expense.findByIdAndRemove(req.body.id, (err, expense) => {
    if (err) {
      return res.json({ success: false, message: "some Error" });
    }
    return res.json({
      success: true,
      message: "deleted successfully"
    });
  });
});

router.route("/edit").post(function(req, res) {
  Expense.findOneAndUpdate(
    { _id: req.body.id },
    req.body,
    { new: true },
    (err, todo) => {
      if (err) {
        return res.json({ success: false, message: "Some Error", error: err });
      }
      console.log(todo);
      return res.json({ success: true, message: "Updated successfully", todo });
    }
  );
});

module.exports = router;
