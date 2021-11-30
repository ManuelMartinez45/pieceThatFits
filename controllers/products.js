// Dependencies
const productRouter = require('express').Router()
const Product = require('../models/product.js')
const productSeed = require('../models/productSeed.js')


// ROUTES

// Seed
productRouter.get('/seed', (req,res) => {
    Product.deleteMany({}, (err, allProducts) => {})
    Product.create(productSeed, (err, data) => {
        res.redirect('/')
    })
})
// Index
productRouter.get('/', (req,res) => {
    Product.find({}, (err, allProducts) => {
        let priceRand = Math.floor(Math.random() * (150 - 350) - 150);
        let qtyRand = Math.floor(Math.random() * (1 * 15) - 1);
        priceRand < 0 ? priceRand *= -1 : priceRand
        qtyRand < 0 ? qtyRand *= -1 : qtyRand
        for(product of allProducts){
            product.qty = qtyRand
            product.price = priceRand
        }
        console.log(allProducts)
        res.render('index.ejs', {
            products: allProducts
        })
    })
})

productRouter.get('/products', (req,res) => {
    res.render('show.ejs')
})



module.exports = productRouter