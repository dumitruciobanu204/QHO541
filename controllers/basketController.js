const express = require('express');
const router = express.Router();
const Basket = require('../models/basketSchema');
const MoviesData = require('../models/moviesSchema');

router.get('/basket', async (req, res) => {
    try {
        const basket = await Basket.find();
        res.render('basket', { basket });
    } catch (error) {
        console.error('Error fetching basket items:', error);
        res.status(500).render('error', { message: 'Internal Server Error' });
    }
});

router.post('/add-to-basket', async (req, res) => {
    try {
        const { title, price } = req.body;
        
        if (!price) {
            throw new Error('Price is missing');
        }
    
        const numericPrice = parseFloat(price.replace('$', ''));

        let existingItem = await Basket.findOne({ title });
    
        if (existingItem) {
            existingItem.quantity += 1;
            existingItem.totalPrice += numericPrice;
            await existingItem.save();
        } else {
            const newItem = new Basket({ title, price: numericPrice, quantity: 1, totalPrice: numericPrice });
            await newItem.save();
        }

        res.status(204).send();
    } catch (error) {
        console.error('Error adding item to basket:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/decrease-quantity', async (req, res) => {
    try {
        const { title } = req.body;
        
        const existingItem = await Basket.findOne({ title });
    
        if (existingItem) {
            if (existingItem.quantity > 1) {
                existingItem.quantity -= 1;
                existingItem.totalPrice -= existingItem.price;
                await existingItem.save();
            } else if (existingItem.quantity === 1) {
                existingItem.quantity = 0;
                existingItem.totalPrice = 0;
                await existingItem.save();
            }
        }

        res.redirect('/basket');
    } catch (error) {
        console.error('Error decreasing item quantity:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/increase-quantity', async (req, res) => {
    try {
        const { title } = req.body;

        const movie = await MoviesData.findOne({ Title: title });

        if (movie && movie.Quantity !== undefined) {
            const existingItem = await Basket.findOne({ title });
    
            if (existingItem) {
                if (existingItem.quantity < movie.Quantity) {
                    existingItem.quantity += 1;
                    existingItem.totalPrice += existingItem.price;
                    await existingItem.save();
                    res.redirect('/basket');
                } else {
                    res.status(400).json({ error: 'Exceeded stock quantity' });
                }
            }
        } else {
            res.status(404).json({ error: 'Movie not found' });
        }
    } catch (error) {
        console.error('Error increasing item quantity:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/clear-basket', async (req, res) => {
    try {
        await Basket.deleteMany({});
        res.sendStatus(200);
    } catch (error) {
        console.error('Error clearing basket:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/remove-from-basket', async (req, res) => {
    try {
        const { title } = req.body;
        await Basket.deleteOne({ title: title });
        res.redirect('/basket');
    } catch (error) {
        console.error('Error removing item from basket:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

setInterval(async () => {
    try {
        const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);
        await Basket.deleteMany({ addedAt: { $lt: thirtyMinutesAgo } });
        // console.log('Basket emptied');
    } catch (error) {
        console.error('Error emptying basket:', error);
    }
}, 30 * 60 * 1000);

module.exports = router;
