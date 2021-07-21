import asyncHandler from "express-async-handler";
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
    });

    const createOrder = await order.save();

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
      email_Address: req.body.payer.email_address,
    };
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
  const order = await Order.findById({ user: req.user._id });
  res.json(orders);
});

export { addOrderItems, getOrderById, updateOrderToPaid, getMyOrders };
