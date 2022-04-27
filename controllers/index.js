import Word from '../models/Word';
import ErrorResponse from '../utils/errorResponse';
import asyncHandler from '../middleware/async';

const getItems = asyncHandler(async (req, res, next) => {
  const words = await Word.find();
  res.status(200).json({
    success: true,
    count: words.length,
    data: words
  });
});

const getItem = asyncHandler(async (req, res, next) => {
  const word = await Word.findById(req.params.id);
  if (!word) {
    return next(new ErrorResponse(`Item not found with id of ${req.params.id}`, 404));
  }
  res.status(200).json({
    success: true,
    data: word
  });
});

const createItem = asyncHandler(async (req, res, next) => {
  const word = await Word.create(req.body);
  res.status(201).json({
    success: true,
    data: word
  });
});

const updateItem = asyncHandler(async (req, res, next) => {
  const word = await Word.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  if (!word) {
    return next(new ErrorResponse(`Item not found with id of ${req.params.id}`, 404));
  }
  res.status(200).json({ success: true, data: word });
});

const deleteItem = asyncHandler(async (req, res, next) => {
  const word = await Word.findByIdAndDelete(req.params.id);
  if (!word) {
    return next(new ErrorResponse(`Item not found with id of ${req.params.id}`, 404));
  }
  res.status(200).json({ success: true, data: {} });
});

export { getItems, getItem, createItem, updateItem, deleteItem };