import asyncHandler from "express-async-handler";
import VendorOrder from "../models/vendorOrderModel.js";
import Order from "../models/orderModel.js";

//@desc    create new oRDER
//@route   post /api/orders
//@access  PRIVATE
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No Order items");
    return;
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      createdAt: Date.now(),
    });

    const createOrder = await order.save();

    res.status(201).json(createOrder);
  }
});

//@desc    create vendorwise oRDER
//@route   post /api/orders/vendor
//@access  PRIVATE/vendor
const addVendorOrder = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    vendorId,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No Order items");
    return;
  } else {
    const vendororder = new VendorOrder({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      vendorId,
      createdAt: Date.now(),
    });

    const createOrder = await vendororder.save();

    res.status(201).json(createOrder);
  }
});

//@desc    GET ORDER by ID
//@route   Get /api/orders/:id
//@access  PRIVATE
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (order) {
    res.json(order);
  } else {
    throw new Error("Order not Found");
  }
});

//@desc    Update ORDER to paid
//@route   Get /api/orders/:id/pay
//@access  PRIVATE
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    throw new Error("Order not Found");
  }
});

//@desc    Update ORDER to delivered
//@route   Get /api/orders/:id/deliver
//@access  PRIVATE/Damin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    throw new Error("Order not Found");
  }
});
//@desc    GET logged in userOrders
//@route   Get /api/orders/myorders
//@access  PRIVATE
const getMyOrders = asyncHandler(async (req, res) => {
  console.log(req.user._id);
  const order = await Order.find({ user: req.user._id });
  res.json(order);
});
//@desc    GET orders received by vendors
//@route   Get /api/vendor/:id
//@access  PRIVATE
const getVendorOrders = asyncHandler(async (req, res) => {
  const orders = await VendorOrder.find({ vendorId: req.user._id });

  res.json(orders);
});

//@desc    GET all Orders
//@route   Get /api/orders
//@access  PRIVATE/Admin
const getOrders = asyncHandler(async (req, res) => {
  const order = await Order.find({}).populate("user", "id name");
  res.json(order);
});

export {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
  getOrders,
  updateOrderToDelivered,
  getVendorOrders,
  addVendorOrder,
};
