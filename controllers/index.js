import Word from '../models/Word';
import ErrorResponse from '../utils/errorResponse';
import asyncHandler from '../middleware/async';

import { fetchThirdPartyData } from './ThirdPartyHelpers.js';

const getItems = asyncHandler(async (req, res, next) => {
  const { search } = req.query;

  let query = [];

  const count = await Word.countDocuments({
    origin: { $regex: `^${search}`, $options: 'i' }
  });

  if (search) {
    query = Word.find({
      origin: { $regex: `^${search}`, $options: 'i' }
    });
  } else {
    query = Word.find();
  }

  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const skip = (page - 1) * limit;

  query = query.skip(skip).limit(limit).sort({ _id: -1 });

  const words = await query;

  res.status(200).json({
    success: true,
    count,
    data: words
  });
});

const getItem = asyncHandler(async (req, res, next) => {
  const word = await Word.findOne({
    origin: req.params.origin,
  });

  if (!word) {
    return next(new ErrorResponse(`Item not found with id of ${req.params.id}`, 404));
  }
  res.status(200).json({
    success: true,
    data: word
  });
});

const createItem = asyncHandler(async (req, res, next) => {
  const { origin } = req.body;
  const thirdPartyData = await fetchThirdPartyData(origin);

  const word = await Word.create({
    ...req.body,
    ...thirdPartyData
  });

  res.status(201).json({
    success: true,
    data: word
  });
});

const updateItem = asyncHandler(async (req, res, next) => {
  // const word = await Word.findByIdAndUpdate(req.params.id, req.body, {
  //   new: true,
  //   runValidators: true
  // });
  // if (!word) {
  //   return next(new ErrorResponse(`Item not found with id of ${req.params.id}`, 404));
  // }
  res.status(400).json({ success: false, data: {} });
});

const deleteItem = asyncHandler(async (req, res, next) => {
  const word = await Word.findOneAndDelete({ origin: req.params.origin });
  if (!word) {
    return next(new ErrorResponse(`Item not found: ${req.params.origin}`, 404));
  }
  res.status(200).json({ success: true, data: {} });
});

export { getItems, getItem, createItem, updateItem, deleteItem };