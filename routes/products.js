"use strict";

const express = require('express');
const router = express.Router();
const ProductController = require('../app/api/controllers/products');
router.post('/', ProductController.create);
router.get('/', ProductController.getAll);
router.get('/:productId', ProductController.getById);
router.put('/:productId', ProductController.updateById);
router.delete('/:productId', ProductController.deleteById);
module.exports = router;
