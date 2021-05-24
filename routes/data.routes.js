const {Router} = require('express');
const Customer = require('../models/Customer');
const Factory = require('../models/Factory');
const Product = require('../models/Product');
const router = Router();


router.get(
    '/productsData', auth,
    [],
    async (req, res) => {
        try {
            debugger;
            const products = await Product.findMany({_id: {$exists: true}});
            res.json({products});
        } catch (e) {
            res.status(500).json({message: 'server error'})
        }
    }
)

router.get(
    '/factoriesData', auth,
    [],
    async (req, res) => {
        try {
            const factories = await Factory.findMany({_id: {$exists: true}});
            res.json({factories});
        } catch (e) {
            res.status(500).json({message: 'server error'})
        }
    }
)

router.get(
    '/customersData', auth,
    [],
    async (req, res) => {
        try {
            const customers = await Customer.findMany({_id: {$exists: true}});
            res.json({customers});
        } catch (e) {
            res.status(500).json({message: 'server error'})
        }
    }
)

module.exports = router;