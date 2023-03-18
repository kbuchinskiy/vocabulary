import knex from 'knex';
import ErrorResponse from '../utils/errorResponse';
import asyncHandler from '../middleware/async';
import { fetchThirdPartyData, getDefinitionsArray } from './ThirdPartyHelpers.js';
import knexClient from '../db';

const getItems = asyncHandler(async (req, res, next) => {
  const { search } = req.query;

  const countResult = await knexClient('words').count();
  const count = Number(countResult[0].count);

  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const offset = (page - 1) * limit;

  let query = knexClient('words');
  if (search) {
    query = query.where('origin', 'ILIKE', `%${search}%`);
  }
  const wordsTableData = await query.limit(limit).offset(offset).orderBy('createdAt', 'desc');
  const definitionsTableData = await knexClient('definitions').whereIn('origin_id', wordsTableData.map(w => w.origin));

  const wordsWithDefinitions = wordsTableData.map(word => ({
    ...word,
    definitions: definitionsTableData.filter(def => def.origin_id === word.origin),
  }));

  res.status(200).json({
    success: true,
    count,
    data: wordsWithDefinitions
  });
});

const getItem = asyncHandler(async (req, res, next) => {
  const word = await knexClient('words').where('origin', req.params.origin);
  const definitions = await knexClient('definitions').whereIn('origin_id', [
    req.params.origin,
  ]);
  res.status(200).json({
    success: true,
    data: {
      ...word[0],
      definitions,
    },
  });
});

const createItem = asyncHandler(async (req, res, next) => {
  const { origin, translation } = req.body;
  const thirdPartyData = await fetchThirdPartyData(origin);
  const { phonetic, imgUrl } = thirdPartyData;

  let definitionsArr = getDefinitionsArray(thirdPartyData.definitions, origin);

  await knexClient('words').insert({
    origin,
    translation,
    phonetic,
    image_url: imgUrl
  });

  if (definitionsArr.length) {
    await knexClient('definitions').insert(definitionsArr);
  }
  
  res.status(201).json({
    success: true,
    data: definitionsArr
  });
});

const deleteItem = asyncHandler(async (req, res, next) => {
  const result = await knexClient('words')
    .where('origin', req.params.origin)
    .del();
  if (!result) {
    return next(new ErrorResponse(`Item not found: ${req.params.origin}`, 404));
  }
  res.status(200).json({ success: true, data: {} });
});

export { getItems, getItem, createItem, deleteItem };
