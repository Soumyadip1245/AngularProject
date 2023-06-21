const router = require("express").Router();
const User = require("../models/user");
var ObjectId = require("mongoose").Types.ObjectId;
router.post("/addBank/:id", (req, res) => {
  const id = req.params.id;
  const data = {
    account: req.body.account,
    bankname: req.body.bankname,
    ifsccode: req.body.ifsccode,
    branch: req.body.branch,
    accounttype: req.body.accounttype,
  };

  User.findByIdAndUpdate(id, data)
    .then((updatedUser) => {
      if (updatedUser) {
        res.json({
          message: "Bank data added successfully",
          success: true,
          data: updatedUser,
        });
      } else {
        res.json({ message: "User not found", success: false });
      }
    })
    .catch((error) => {
      console.log(error);
      res.json({ message: "Error adding bank data", success: false });
    });
});

router.post("/addUser", (req, res) => {
  const user = new User({
    email: req.body.email,
  });
  User.find({ email: req.body.email })
    .then((value) => {
      if (value.length == 0) {
        user
          .save()
          .then((curr) => {
            res.json({ message: "Registered", success: true, data: curr });
          })
          .catch((e) => {
            res.json({ message: "not Registered", success: false });
          });
      } else {
        res.json({ message: "Data Fetched", success: true, data: value });
      }
    })
    .catch((e) => {
      console.log(e);
    });
});
router.get("/checkdata/:id", (req, res) => {
  const userId = req.params.id;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        res.json({ success: false, message: "User not found" });
        return;
      }

      const { account, bankname, ifsccode, branch, accounttype } = user;

      if (
        account === "" &&
        bankname === "" &&
        ifsccode === "" &&
        branch === "" &&
        accounttype === ""
      ) {
        res.json({ success: true, message: "All fields are empty" });
      } else {
        res.json({
          success: false,
          message: "Some fields are not empty",
          data: user,
        });
      }
    })
    .catch((error) => {
      console.log(error);
      res.json({ success: false, message: "Error retrieving user data" });
    });
});
router.put("/editData/:id", (req, res) => {
  const branch = req.body.branch;
  const ifsccode = req.body.ifsccode;
  User.findByIdAndUpdate(req.params.id, { branch, ifsccode })
    .then(() => {
      res.json({ message: "Updated" });
    })
    .catch((e) => {
      console.log(e);
    });
});
router.put("/deleteData/:id", (req, res) => {
  const account = req.body.account;
  const branch = req.body.branch;
  const ifsccode = req.body.ifsccode;
  const bankname = req.body.bankname;
  const accounttype = req.body.accounttype;
  User.findByIdAndUpdate(req.params.id, {
    account,
    branch,
    ifsccode,
    bankname,
    accounttype,
  })
    .then(() => {
      res.json({ message: "Updated" });
    })
    .catch((e) => {
      console.log(e);
    });
});
module.exports = router;
