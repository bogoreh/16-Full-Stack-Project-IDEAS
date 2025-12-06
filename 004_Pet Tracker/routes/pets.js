const express = require('express');
const router = express.Router();
const Pet = require('../models/Pet');

// GET all pets
router.get('/', async (req, res) => {
    try {
        const pets = await Pet.find().sort({ createdAt: -1 });
        res.render('pages/index', { pets });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

// GET add pet form
router.get('/add', (req, res) => {
    res.render('pages/add-pet');
});

// POST create new pet
router.post('/', async (req, res) => {
    try {
        const pet = new Pet(req.body);
        await pet.save();
        res.redirect('/pets');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

// GET view single pet
router.get('/:id', async (req, res) => {
    try {
        const pet = await Pet.findById(req.params.id);
        if (!pet) {
            return res.status(404).send('Pet not found');
        }
        res.render('pages/view-pet', { pet });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

// GET edit pet form
router.get('/edit/:id', async (req, res) => {
    try {
        const pet = await Pet.findById(req.params.id);
        if (!pet) {
            return res.status(404).send('Pet not found');
        }
        res.render('pages/edit-pet', { pet });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

// PUT update pet
router.put('/:id', async (req, res) => {
    try {
        await Pet.findByIdAndUpdate(req.params.id, req.body);
        res.redirect(`/pets/${req.params.id}`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

// DELETE pet
router.delete('/:id', async (req, res) => {
    try {
        await Pet.findByIdAndDelete(req.params.id);
        res.redirect('/pets');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

module.exports = router;