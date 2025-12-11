const asyncHandler = require('express-async-handler');
const Wishlist = require('../models/wishlistModel');

// @desc    Get user wishlist
// @route   GET /api/wishlist
// @access  Private
const getWishlist = asyncHandler(async (req, res) => {
  const wishlist = await Wishlist.findOne({ user: req.user._id }).populate(
    'products'
  );

  if (wishlist) {
    res.json(wishlist);
  } else {
    res.status(404);
    throw new Error('Wishlist not found');
  }
});

// @desc    Add product to wishlist
// @route   POST /api/wishlist/:id
// @access  Private
const addProductToWishlist = asyncHandler(async (req, res) => {
  const wishlist = await Wishlist.findOne({ user: req.user._id });

  if (wishlist) {
    const product = req.params.id;
    if (wishlist.products.includes(product)) {
      res.status(400);
      throw new Error('Product already in wishlist');
    }
    wishlist.products.push(product);
    await wishlist.save();
    res.json(wishlist);
  } else {
    const newWishlist = new Wishlist({
      user: req.user._id,
      products: [req.params.id],
    });
    await newWishlist.save();
    res.status(201).json(newWishlist);
  }
});

// @desc    Remove product from wishlist
// @route   DELETE /api/wishlist/:id
// @access  Private
const removeProductFromWishlist = asyncHandler(async (req, res) => {
  const wishlist = await Wishlist.findOne({ user: req.user._id });

  if (wishlist) {
    const product = req.params.id;
    wishlist.products = wishlist.products.filter(
      (p) => p.toString() !== product
    );
    await wishlist.save();
    res.json(wishlist);
  } else {
    res.status(404);
    throw new Error('Wishlist not found');
  }
});

module.exports = {
  getWishlist,
  addProductToWishlist,
  removeProductFromWishlist,
};
