const asyncHandler = require("express-async-handler");
const Adminn = require("../Model/AdminSchema");
// const Product = require("../../Product/ProductSchema");
const bcrypt = require("bcryptjs");
const generateToken = require("../../utils/generateToken");
const fs = require("fs");

//
const registerAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).send("please add all fields");
  }
  const AdminExists = await Adminn.findOne({ email });
  if (AdminExists) {
    return res.status(409).send("Email Already Exist. Please Login");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const Admin = await Adminn.create({
    email,
    password: hashedPassword,
  });

  if (Admin) {
    res.status(200).json({
      _id: Admin.id,
      token: generateToken(Admin.id),
      message: "Account created succefully",
    });
  } else {
    res.status(401).json({
      message: "Account not created",
    });
    throw new Error("Invalid client data");
  }
});

//
const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const client = await Adminn.findOne({ email });
  console.log(client);
  if (client && (await bcrypt.compare(password, client.password))) {
    res.json({
      _id: client.id,
      token: generateToken(client.id),
      message: "Admin loged succes",
    });
  } else {
    res.status(400).json({
      message: "invalid client Data",
    });
  }
});

//

module.exports = {
  registerAdmin,
  loginAdmin,

};
