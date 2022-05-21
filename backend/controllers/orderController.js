const Booking = require("../models/orderModel");
const product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../midleware/catchAsyncError");

// Create new Order
exports.newOrder = catchAsyncError(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    bookingDate,
    // bookingTime
  } = req.body;
  console.log(bookingDate);

  const order = await Booking.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    // bookingDate,
    // bookingTime,
    paidAt: Date.now(),
    user: req.user._id,
  });

  res.status(201).json({
    success: true,
    order,
  });
});

//get Single Order
exports.getSingleOrder = catchAsyncError(async (req, res, next) => {
  const order = await Booking.findById(req.params.id).populate(
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

// get logged in user  Orders
exports.myOrders = catchAsyncError(async (req, res, next) => {
  const orders = await Booking.find({ user: req.user._id });

  res.status(200).json({
    success: true,
    orders,
  });
});

// get all Orders -- Admin
exports.getAllOrders = catchAsyncError(async (req, res, next) => {
  const orders = await Booking.find();

  let totalAmount = 0;

  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
});

// update Order Status -- Admin
exports.updateOrder = catchAsyncError(async (req, res, next) => {
  const booking = await Booking.findById(req.params.id);

  if (!booking) {
    return next(new ErrorHander("Order not found with this Id", 404));
  }

  if (booking.orderStatus === "Confirmed") {
    return next(new ErrorHander("Your Booking has been confirmed", 400));
  }

  // if (req.body.status === "Shipped") {
  //   booking.orderItems.forEach(async (o) => {
  //     await updateStock(o.product, o.quantity);
  //   });
  // }
  booking.orderStatus = req.body.status;

  if (req.body.status === "Confirmed") {
    booking.deliveredAt = Date.now();
  }

  await booking.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  });
});

// async function updateStock(id, quantity) {
//   const service = await product.findById(id);

//   service.Stock -= quantity;

//   await service.save({ validateBeforeSave: false });
// }

// delete Order -- Admin
exports.deleteOrder = catchAsyncError(async (req, res, next) => {
  const order = await Booking.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("Order not found with this Id", 404));
  }

  await order.remove();

  res.status(200).json({
    success: true,
  });
});
