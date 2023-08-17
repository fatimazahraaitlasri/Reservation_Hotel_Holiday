const express = require("express");
const Router = express.Router();
const multer = require("multer");
// const isAdmin = require("../../Admin/Middleware/AdminMiddleware")
const { protectAdmin } = require("../Middleware/AdminMiddleware");

const { registerAdmin, loginAdmin } = require("../Controller/AdminController");
const {
  AddManager,
  UpdateManager,
  deleteManager,
  getAllManager,
  getManagerById,
} = require("../../Manager/Controller/ManagerController");
const { AddRoom } = require("../../Chambre/Controller/ChambreController");

const Storege = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: Storege });
Router.post("/Register", registerAdmin)
  .post("/login", loginAdmin)
  .post("/AddManager", protectAdmin, AddManager)
  .put("/updateManager/:_id", protectAdmin, UpdateManager)
  .delete("/DeleteManager/:_id", protectAdmin, deleteManager)
  .get("/getAllManager", protectAdmin, getAllManager)
  .get("/getManagerByID/:_id", protectAdmin, getManagerById)
  .post("/AddRoom", upload.single("testImage"), AddRoom);

module.exports = Router;
