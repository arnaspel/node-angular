const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/product');


router.get('/', (req, res, next) => {
   Product.find()
   .select('name content _id')
   .exec()
   .then(docs => {
       const response ={
            count: docs.length,
            products: docs
       }
       res.status(200).json(response);
   })
   .catch(err => {
       console.log(err);
       res.status(500).json({error: err});
   
});
});
router.post('/', (req, res, next) => {
    const product = new Product({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        content: req.body.content
    });
    product.save()
    .then(createdProduct => {    
        res.status(201).json({
            message: 'Handling POST request to /products',
            productId: createdProduct._id
        });
    
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    
    });

});
router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id)
    .exec()
    .then(doc => {
        console.log(doc);
        if(doc){
        res.status(200).json(doc);
        }else{res.status(404).json({message: 'No valid Id provided to the product'})
    }})
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    
 });
 });

router.put('/:id', (req, res, next) => {
    const  product = new Product({
        _id: req.body.id,
        name: req.body.name,
        content: req.body.content
    });
    Product.update({_id: req.params.id}, product).then(result => {
          
          res.status(200).json(result);
      })
      .catch(err => {
          console.log(err);
          res.status(500).json({
              error: err
          });
      }); 
      });
  
  router.delete('/:productId', (req, res, next) => {
      const  id = req.params.productId;
      Product.remove({_id: id})
      .exec()
      .then(result =>{
          res.status(200).json(result)
      })
      .catch(err => {
          console.log(err);
          res.status(500).json({
              error: err
          });
      });
      
  });

module.exports = router;