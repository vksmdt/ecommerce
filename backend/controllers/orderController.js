const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const catchAsyncError = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/erroHandler");

// create new Order
exports.newOrder = catchAsyncError(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemesPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemesPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });

  res.status(201).json({
    success: true,
    order,
  });
});

// get single order -- admin

exports.getSingleOrder = catchAsyncError(async (req, res, next) => {
  // populate function identify karta user ko user id se or uska name or email  le lega
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    return next(new ErrorHandler("Order not found with this Id", 404));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

// get logged in user orders

exports.myOrders = catchAsyncError(async (req, res, next) => {
  // populate function identify karta user ko user id se or uska name or email  le lega
  const orders = await Order.find({
    user: req.user._id,
  });

  res.status(200).json({
    success: true,
    orders,
  });
});

// get all order -- admin

exports.getAllOrder = catchAsyncError(async (req, res, next) => {
  const orders = await Order.find();

  let totalAmount = 0;

  orders.forEach((order) => (totalAmount += order.totalPrice));

  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
});

// update order status -- admin

exports.updtaeOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("Order not found with this Id", 404));
  }

  if (order.orderStatus === "Delivered") {
    return next(
      new ErrorHandler("you have already delivered this order ", 404)
    );
  }

  if (req.body.status === "Shipped") {
    order.orderItems.forEach(async (ordr) => {
      await updateStock(ordr.product, ordr.quantity);
    });
  }
  order.orderStatus = req.body.status;

  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }

  await order.save({
    validateBeforeSave: false,
  });
  res.status(200).json({
    success: true,
  });
});

// updateb function
async function updateStock(id, quantity) {
  const product = await Product.findById(id);

  product.stock -= quantity;
  await product.save({
    validateBeforeSave: false,
  });
}

//delete order -- admin

exports.deleteOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("Order not found with this Id", 404));
  }
  await order.remove();

  res.status(200).json({
    success: true,
  });
});
