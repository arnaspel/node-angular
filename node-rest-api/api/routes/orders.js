const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET orders request!'
    });
});

router.post('/', (req, res, next) => {
   const order = {
        productId: req.body.productId,
        quantity: req.body.quantity
        };
    res.status(201).json({
        message: 'Order was created',
        order: order
    });
});
router.get('/:orderId', (req, res, next) => {
    res.status(200).json({
        message: 'Order was created',
        id: req.params.orderId
    });
});
//Routes that handle delete orders
router.delete('/:orderId', (req, res, next) => {
    res.status(200).json({
        message: 'Order was deleted',
        id: req.params.orderId
    });
});
module.exports = router;