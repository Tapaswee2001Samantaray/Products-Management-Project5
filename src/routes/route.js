const express = require('express');
const router = express.Router();

const { registerUser, getUser, updateUsers, login } = require('../controller/userController');
const { createProduct, getProducts, fetchProductsById, deleteProductById, updateProducts } = require("../controller/productController");
const { createCart, updatecart, getCartDetails, deleteCart } = require("../controller/cartController");
const { placeOrder, updatedOrder } = require("../controller/orderController");
const { uploadfiles } = require("../middleware/aws");
const { isAuthentication } = require("../middleware/commonMiddleware");


//=======APIs for User=========
router.post("/register", uploadfiles, registerUser);
router.get('/user/:userId/profile', isAuthentication, getUser);
router.post("/login", login);
router.put('/user/:userId/profile', isAuthentication, updateUsers);
//======APIs for Product========
router.post("/products", uploadfiles, createProduct);
router.get("/products", getProducts);
router.get("/products/:productId", fetchProductsById);
router.put("/products/:productId", updateProducts);
router.delete("/products/:productId", deleteProductById);
//======APIs for Cart========
router.post('/users/:userId/cart', isAuthentication, createCart);
router.get("/users/:userId/cart", isAuthentication, getCartDetails);
router.put("/users/:userId/cart", isAuthentication, updatecart);
router.delete("/users/:userId/cart", isAuthentication, deleteCart);
//======APIs for Order========
router.post('/users/:userId/orders', isAuthentication, placeOrder);
router.put('/users/:userId/orders', isAuthentication, updatedOrder);

//====== Invalid Path API =====
router.all('/*', (req, res) => {
    res.status(400).send({ status: false, message: "Path is Invalid" });
});


module.exports = router