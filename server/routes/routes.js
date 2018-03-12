var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var Expense = require("../models/Expense");

router.route("/test1").get(function(req, res, next) {
  // Comment out this line:
  res.send("api is working");
  // And insert something like this instead:
  // res.json([
  //   {
  //     id: 1,
  //     username: "samsepi0l"
  //   },
  //   {
  //     id: 2,
  //     username: "D0loresH4ze"
  //   }
  // ]);
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

router.route("/update").post(function(req, res) {
  const doc = {
    description: req.body.description,
    amount: req.body.amount,
    month: req.body.month,
    year: req.body.year
  };
  console.log(doc);
  Expense.update({ _id: req.body._id }, doc, function(err, result) {
    if (err) res.send(err);
    res.send("Expense successfully updated!");
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

router.get("/delete", function(req, res) {
  Expense.findByIdAndRemove(req.params.id, (err, expense) => {
    if (err) {
      return res.json({ success: false, message: "some Error" });
    }
    return res.json({
      success: true,
      message: expense + "deleted successfully"
    });
  });
});

module.exports = router;
