const express = require('express');
const router = express.Router();
const {
  getWishlist,
  addProductToWishlist,
  removeProductFromWishlist,
} = require('../controllers/wishlistController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getWishlist);
router
  .route('/:id')
  .post(protect, addProductToWishlist)
  .delete(protect, removeProductFromWishlist);

module.exports = router;
