const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', adminController.getAddProduct);

// /admin/products => GET
router.get('/products', adminController.getProducts);

// /admin/add-product => POST
router.post('/add-product',
[
    check('firstName').notEmpty().withMessage('First name is required'),
    check('lastName').notEmpty().withMessage('Last name is required'),
    check('imageURL').notEmpty().withMessage(' image is required'),
    check('phone.countryCode').notEmpty().withMessage('Phone country code is required'),
    check('phone.phoneNumber').notEmpty().withMessage('Phone number is required'),
    check('gender').notEmpty().withMessage('Gender is required'),
    check('dateOfBirth').notEmpty().withMessage('Date of birth is required').isDate().withMessage('Invalid date format'),
    check('city').notEmpty().withMessage('City is required'),
  ],
   adminController.postAddProduct);

router.get('/edit-product/:productId', adminController.getEditProduct);

router.post('/edit-product',
[
    check('firstName').notEmpty().withMessage('First name is required'),
    check('lastName').notEmpty().withMessage('Last name is required'),
    check('phone.countryCode').notEmpty().withMessage('Phone country code is required'),
    check('phone.phoneNumber').notEmpty().withMessage('Phone number is required'),
    check('gender').notEmpty().withMessage('Gender is required'),
    check('dateOfBirth').notEmpty().withMessage('Date of birth is required').isDate().withMessage('Invalid date format'),
    check('city').notEmpty().withMessage('City is required'),
  ],
   adminController.postEditProduct);

router.post('/delete-product', adminController.postDeleteProduct);

module.exports = router;
