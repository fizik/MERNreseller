import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import Vendor from "../models/vendorDetailsModel.js";

//@desc  Auth user and get token
//@route   post /api/user/login
//@access  public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      type: user.type,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

//@desc  Register user
//@route   POST /api/users
//@access  public

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, type } = req.body;

  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("User already Exist");
  }
  const user = await User.create({
    name,
    email,
    password,
    type,
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      type: user.type,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

//@desc  Register vendor
//@route   POST /api/users/vendor
//@access  private/vendor

const registerVendor = asyncHandler(async (req, res) => {
  const { vendorId, shopName, warehouseAddress, returnAddress } = req.body;
  const vendorRegistered = await Vendor.findOne({ vendorId });
  if (!vendorRegistered) {
    await Vendor.create({
      vendorId: req.body.vendorId,
      shopName: req.body.shopName,
      warehouseAddress: {
        country: req.body.warehouseAddress.country,
        city: req.body.warehouseAddress.city,
        address: req.body.warehouseAddress.address,
        postalCode: req.body.warehouseAddress.postalCode,
      },
      returnAddress: {
        country: req.body.returnAddress.country,
        city: req.body.returnAddress.city,
        address: req.body.returnAddress.address,
        postalCode: req.body.returnAddress.postalCode,
      },
    });
    res.status(201);
  } else {
    res.status(400);
    throw new Error("Vendor Registered");
  }
});
//@desc  Get user profile
//@route   GET /api/user/profile
//@access  private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      type: user.type,
    });
  } else {
    res.status(404);
    throw new Error("User not Found");
  }
});

//@desc  Update user profile
//@route   PUT /api/user/profile
//@access  private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      type: updatedUser.type,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User not Found");
  }
});
//@desc  Get all user
//@route   GET /api/users
//@access  private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

//@desc  Delete User
//@route   Delete /api/users/:id
//@access  private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    await user.remove();
    res.json({ message: "user Removed" });
  } else {
    res.status(404);
    throw new Error("User not founnd");
  }
});

//@desc  Edit  user
//@route   GET /api/users/:id
//@access  private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not founnd");
  }
});
//@desc  Update user
//@route   PUT /api/user/:id
//@access  private
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin;
    user.type = req.body.type || user.type;
    const updatedUser = await user.save();
    res.json({
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      type: updatedUser.type,
    });
  } else {
    res.status(404);
    throw new Error("User not Found");
  }
});
export {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  registerVendor,
};
