import Product from "../models/productModel.js";
import HandleError from "../utils/handleError.js";
import handleAsyncError from "../middleware/handleAsyncError.js";
import APIFunctionality from "../utils/apiFunctionality.js";
import { v2 as cloudinary } from "cloudinary";

export const createProducts = handleAsyncError(async (req, res, next) => {
  let image = [];
  if (typeof req.body.image === "string") {
    image.push(req.body.image);
  } else {
    image = req.body.image;
  }

  const imageLinks = [];
  for (let i = 0; i < image.length; i++) {
    const result = await cloudinary.uploader.upload(image[i], {
      folder: "products",
    });
    imageLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.image = imageLinks;
  req.body.user = req.user.id;
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});


export const getAllProducts = handleAsyncError(async (req, res, next) => {
  const resultsPerPage = 4;
  const apiFeatures = new APIFunctionality(Product.find(), req.query)
    .search()
    .filter();

  const filteredQuery = apiFeatures.query.clone();
  const productCount = await filteredQuery.countDocuments();


  const totalPages = Math.ceil(productCount / resultsPerPage);
  const page = Number(req.query.page) || 1;

  if (page > totalPages && productCount > 0) {
    return next(new HandleError("This page doesn't exist", 404));
  }

  apiFeatures.pagination(resultsPerPage);
  const products = await apiFeatures.query;

  if (!products || products.length === 0) {
    return next(new HandleError("No Product Found", 404));
  }
  res.status(200).json({
    success: true,
    products,
    productCount,
    resultsPerPage,
    totalPages,
    currentPage: page,
  });
});


export const updateProduct = handleAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new HandleError("Product Not Found", 404));
  }

  let images = [];
  if (req.body.image) {
    if (typeof req.body.image === "string") {
      images.push(req.body.image);
    } else if (Array.isArray(req.body.image)) {
      images = req.body.image;
    }

    // Delete old images
    for (let i = 0; i < product.image.length; i++) {
      await cloudinary.uploader.destroy(product.image[i].public_id);
    }

    // Upload new images
    const imageLinks = [];
    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.uploader.upload(images[i], {
        folder: "products",
      });
      imageLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.image = imageLinks;
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    product,
  });
});




export const deleteProduct = handleAsyncError(async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) {
    return next(new HandleError("Product Not Found", 404));
  }
  for (let i = 0; i < product.image.length; i++) {
    await cloudinary.uploader.destroy(product.image[i].public_id);
  }
  res.status(200).json({
    success: true,
    message: "Product Deleted successfully",
  });
});

export const getSingleProduct = handleAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new HandleError("Product Not Found", 404));
  }
  res.status(200).json({
    success: true,
    product,
  });
});

export const createReviewForProduct = handleAsyncError(
  async (req, res, next) => {
    const { rating, comment, productId } = req.body;
    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment,
    };
    const product = await Product.findById(productId);
    if (!product) {
      return next(new HandleError("Product not found", 400));
    }
    const reviewExists = product.reviews.find(
      (review) => review.user.toString() === req.user.id.toString()
    );
    if (reviewExists) {
      product.reviews.forEach((review) => {
        if (review.user.toString() === req.user.id.toString()) {
          (review.rating = rating), (review.comment = comment);
        }
      });
    } else {
      product.reviews.push(review);
    }
    product.numOfReviews = product.reviews.length;
    let sum = 0;
    product.reviews.forEach((review) => {
      sum += review.rating;
    });
    product.ratings =
      product.reviews.length > 0 ? sum / product.reviews.length : 0;
    await product.save({ validateBeforeSave: false });
    res.status(200).json({
      success: true,
      product,
    });
  }
);

export const getProductReviews = handleAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.id);
  if (!product) {
    return next(new HandleError("Product not found", 400));
  }
  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

export const deleteReview = handleAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);
  if (!product) {
    return next(new HandleError("Product not found", 400));
  }
  const reviews = product.reviews.filter(
    (review) => review._id.toString() !== req.query.id.toString()
  );
  let sum = 0;
  reviews.forEach((review) => {
    sum += review.rating;
  });
  const ratings = reviews.length > 0 ? sum / reviews.length : 0;
  const numOfReviews = reviews.length;
  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json({
    success: true,
    message: "Review Deleted Successfully",
  });
});


export const getAdminProducts = handleAsyncError(async (req, res, next) => {
  const products = await Product.find();
  res.status(200).json({
    success: true,
    products,
  });
});
