const express = require("express");
const {
  getAllproducts,
  createProduct,
  updateProduct,
  deleteProduct,
  productDetails,
  createProductReview,
  getProductReviews,
  deleteReview,
  getAdminproducts,
} = require("../controllers/productController");
const { isAuthenticatedUser, authorizeRole } = require("../middleware/auth");
// const { isAuthenticatedUser } = require("../middleware/auth");

const router = express.Router();

// admin product route
router
  .route("/admin/products")
  .get(isAuthenticatedUser, authorizeRole("admin"), getAdminproducts);

router.route("/products").get(getAllproducts);
router
  .route("/admin/product/new")
  .post(isAuthenticatedUser, authorizeRole("admin"), createProduct);
router
  .route("/admin/product/:id")
  .put(isAuthenticatedUser, authorizeRole("admin"), updateProduct)
  .delete(isAuthenticatedUser, authorizeRole("admin"), deleteProduct);

router.route("/product/:id").get(productDetails);

router.route("/review").put(isAuthenticatedUser, createProductReview);

router
  .route("/reviews")
  .get(getProductReviews)
  .delete(isAuthenticatedUser, deleteReview);

module.exports = router;
