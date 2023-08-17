const asyncHandler = require("express-async-handler");
const Adminn = require("../Model/ChambreSchema");
const Chambre = require("../Model/ChambreSchema");
const bcrypt = require("bcryptjs");
const generateToken = require("../../utils/generateToken");
const fs = require("fs");


const AddRoom = asyncHandler(async (req, res) => {
    const { num ,capacity ,testImage  } = req.body;
    console.log(req.body)
    if (!capacity || !num  ) { 
      res.status(400).send("please add all fields");
    }
    const RoomExists = await Chambre.findOne({ num });
    if (RoomExists) {
      return res.status(409).send("Chambre Already Exist. Please Login");
    }
  
    const chambre = await Chambre.create({
        num,
        capacity,
        testImage: {
        data: fs.readFileSync("uploads/" + req.file.filename),
        contentType: "image/png",
      },
      
    });
  
    if (chambre) {
      res.status(200).json(
        chambre
        );
        console.log(chambre);
    } else {
      res.status(401).json({
        message: "Chambre not created",
      });
      throw new Error("Invalid chambre data");
    }
  });
  
//   const UpdateProduct = asyncHandler(async (req, res) => {
//     const productId = req.params._id;
//     const { name, description, price, category } = req.body;
  
  
//     const updatedFields = {};
  
  
  
//     if (name) updatedFields.name = name;
//     if (description) updatedFields.description = description;
//     if (price) updatedFields.price = price;
//     if (category) updatedFields.category = category;
//     if (req.file) {
//       updatedFields.testImage = {
//         data: fs.readFileSync(req.file.path),
//         contentType: req.file.mimetype,
//       };
//     }
  
//     const updatedProduct = await Product.findByIdAndUpdate(
//       productId,
//       updatedFields,
//       { new: true }
//     );
  
//     if (!updatedProduct) {
//       return res.status(404).json({
//         message: "Product not found",
//       });
//     }
  
//     res.status(200).json({
//       message: "Product updated successfully",
//       product: updatedProduct,
//     });
//   });
  
  
  
//   //
//   const getAllProduct = asyncHandler(async (req, res) => {
//     const findProduct = await Product.find();
//     res.status(200).json(findProduct);
//   });
  
//   const getProductById = async (req, res) => {
//     try {
//       const findProductById = await Product.findById(req.params._id);
//       res.status(200).json(findProductById);
//       console.log(findProductById);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: "Server error" });
//     }
//   };
  
//   //@desc DELETE Car
//   //@route /api/v1/cars/:car_id
//   //@access private
//   const deleteProduct = asyncHandler(async (req, res) => {
//     const productDeleted = await Product.findById(req.params._id);
//     productDeleted.remove();
//     res.status(200).json({
//       message: "Product deleted successfully",
//     });
//   });

module.exports =
{
    AddRoom,
}