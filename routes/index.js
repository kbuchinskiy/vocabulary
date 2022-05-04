import express from 'express';

import {
  getItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
} from '../controllers/index';

const router = express.Router();

router
  .route('/')
  .get(getItems)
  .post(createItem);

router
  .route('/:origin')
  .get(getItem)
  .put(updateItem)
  .delete(deleteItem);

export default router;