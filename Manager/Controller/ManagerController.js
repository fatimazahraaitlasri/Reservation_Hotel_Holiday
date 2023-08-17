const asyncHandler = require("express-async-handler");
const Manager = require("../Model/ManagerSchema");
const bcrypt = require("bcryptjs");
const generateToken = require("../../utils/generateToken");
const fs = require("fs");

const loginManager = asyncHandler(async (req, res) => {

    const { matricule, password } = req.body;
    console.log(matricule);
    console.log(password);

    const manager = await Manager.findOne({matricule});
   
    console.log(manager);
    if (manager) {
      res.json({
        _id: manager.id,
        token: generateToken(manager.id),
        message: "Manager loged succes",
      });
    } else {
      res.status(400).json({
        message: "invalid manager Data",
      });
    }
  });




const AddManager = asyncHandler(async (req, res) => {
  const { matricule, password } = req.body;
  console.log(req.body);
  if (!matricule || !password) {
    res.status(400).send("please add all fields");
  }
  const ManagerExists = await Manager.findOne({ matricule });
  if (ManagerExists) {
    return res.status(409).send("MAnager Already Exist. Please Login");
  }

  const manager = await Manager.create({
    matricule,
    password,
  });

  if (manager) {
    res.status(200).json({
      _id: manager.id,
      token: generateToken(manager.id),
      message: "Account created succefully",
    });
  } else {
    res.status(401).json({
      message: "Account not created",
    });
    throw new Error("Invalid manager data");
  }
});
 

const UpdateManager = asyncHandler(async (req, res) => {
  const ManagerId = req.params._id;
  const { matricule, password } = req.body;

  const updatedFields = {};

  if (matricule) updatedFields.matricule = matricule;
  if (password) updatedFields.password = password;
  console.log(updatedFields);
  const updatedManager = await Manager.findByIdAndUpdate(
    ManagerId,
    updatedFields
  );

  if (!updatedManager) {
    return res.status(404).json({
      message: "Manager not found",
    });
  }

  res.status(200).json({
    message: "Manager updated successfully",
    manager: updatedManager,
  });
});

const deleteManager = asyncHandler(async (req, res) => {
  const managerId = req.params._id;
  try {
    const result = await Manager.deleteOne({ _id: managerId });
    if (result.deletedCount === 0) {
      return res.status(404).json({
        message: "Manager not found",
      });
    }
    res.status(200).json({
      message: "Manager deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while deleting the manager",
      error: error.message,
    });
  }
});

const getAllManager = asyncHandler(async (req, res) => {
  const findManager = await Manager.find();
  res.status(200).json(findManager);
});

const getManagerById = async (req, res) => {
  try {
    const findManagerById = await Manager.findById(req.params._id);
    res.status(200).json(findManagerById);

    console.log(findManagerById);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
module.exports = {
  AddManager,
  UpdateManager,
  deleteManager,
  getAllManager,
  getManagerById,
  loginManager
};
