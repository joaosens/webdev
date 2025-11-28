const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainControllers');

router.get('/data', mainController.getData);
router.post('/register', mainController.register);
router.post('/login', mainController.login);
router.post('/checkout', mainController.checkout);

module.exports = router;