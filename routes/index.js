import express from 'express';

import {
  getItems,
  getItem,
  createItem,
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
  .delete(deleteItem);

export default router;