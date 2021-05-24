const {Router} = require('express');
const {check, validationResult} = require('express-validator');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const router = Router();
const jwt = require('jsonwebtoken');
const config = require('config');
const Customer = require('../models/Customer');
const Factory = require('../models/Factory');
const Product = require('../models/Product');
const auth = require('../middleware/auth.middleware')
//endpoints
router.post(
    '/register',
    [
        check('email', 'Некорректный email').isEmail(),
        check('password', 'Минимальная длина пароля 6 символов').isLength({min: 6})
    ],
    async (req, res)=> {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(), 
                message: 'Некорректные данные при регистрации'
            });
        }

        const {email, password} = req.body

        const candidate = await User.findOne({email});

        if (candidate) {
            return res.status(400).json({message: "Такой пользователь уже существует"});
        }

        const hashedPassword = await bcrypt.hash(password,12);
        const user = new User({email, password: hashedPassword})
        
        await user.save();

        res.status(201).json({message: "Пользователь создан"});

    } catch (e) {
        res.status(500).json({message: 'server error'})
    }
})

router.post(
    '/login', 
    [
        check('email', 'Введите корректный email').normalizeEmail().isEmail(),
        check('password', 'Введите пароль').exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
    
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(), 
                    message: 'Некорректные данные при входе в систему'
                });
            }
            
            const {email, password} = req.body;

            const user = await User.findOne({email});

            if (!user) {
                return res.status(400).json({message:'Пользователь не найден'})
            }
            
            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(400).json({message: 'Неверный пароль попробуйте снова'})
            }

            const token = jwt.sign(
                {userId: user.id},
                config.get('jwtSecret'),
                {expiresIn: '1h'}
            );

            res.json({token, userId: user.id})

        } catch (e) {
            res.status(500).json({message: 'server error'})
        }
    }
)

router.get(
    '/productsData', auth,
    async (req, res) => {
        try {
            const products = await Product.find();
            res.json({products});
        } catch (e) {
            res.status(500).json({message: 'server error'});
        }
    }
)

router.get(
    '/factoriesData', auth,
    async (req, res) => {
        try {
            const factories = await Factory.find();
            res.json({factories});
        } catch (e) {
            res.status(500).json({message: 'server error'})
        }
    }
)

router.get(
    '/customersData', auth,
    async (req, res) => {
        try {
            const customers = await Customer.find();
            res.json({customers});
        } catch (e) {
            res.status(500).json({message: 'server error'})
        }
    }
)
module.exports = router;