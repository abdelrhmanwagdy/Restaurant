const express = require('express')
const Restaurant = require('../../models/restaurant')
const router = new express.Router()
const passport = require('passport')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

const addingRestaurantInfoValidator = require('../../utils/restaurant/addingRestaurantInfoValidator')
const updatingRestaurantInfoValidator = require('../../utils/restaurant/updatingRestaurantInfoValidator')
const validateInputs = require('../../utils/restaurant/validateInputs')

// @rout        POST /api/v1/restaurants/restaurant
// @desc        Return Restaurant
// @return      Adding restaurant to the system
// @access      Private
router.post('/restaurant', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const validation_errors = await addingRestaurantInfoValidator(req.body);
    if (validation_errors.length === 0) {
        const restaurant = new Restaurant({
            ...req.body,
            owner: req.user._id
        })
        try {
            await restaurant.save()
            // await restaurant.populate('owner')
            res.status(201).send({ restaurant })
        } catch (e) {
            res.status(400).send(e)
        }
    } else {
        res.status(400).json({ Error: validation_errors });
    }
})

// @rout        POST /api/v1/restaurants/restaurants/:id
// @desc        Return specified Restaurant
// @return      Restaurant
// @access      Public
router.get('/restaurants/:id', async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send({ Error: "Incorrect Restaurant Id" })
    }

    const _id = req.params.id

    try {
        const restaurant = await Restaurant.findOne({ _id })

        if (!restaurant) {
            return res.status(404).send()
        }

        res.send(restaurant)
    } catch (e) {
        console.log(e);
        res.status(500).send()
    }
})

// @rout        GET /api/v1/restaurants/restaurants
// @desc        Return list of Restaurants
// @return      Resturant list
// @access      Public
router.get('/restaurants', async (req, res) => {

    const validation_errors = validateInputs.infoValidatorForUpdateAndQueryOptions(req.query);

    if (validation_errors.length === 0) {

        let query = {}

        if (req.query.name) {
            query["name"] = req.query.name
        }
        if (req.query.age) {
            query["age"] = req.query.age
        }
        if (req.query.address) {
            query["address"] = req.query.address
        }

        try {
            let restaurants = await Restaurant.find(query)
            res.send({ restaurants })
        } catch (e) {
            res.status(500).send()
        }
    } else {
        res.status(400).json({ Error: validation_errors });
    }

})

// @rout        PATCH /api/v1/restaurants/restaurant/:id
// @desc        update Restaurant
// @return       updated Resturant
// @access      Private
router.patch('/restaurants/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send({ Error: "Incorrect Restaurant Id" })
    }

    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'age', 'address']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    const validation_errors = await updatingRestaurantInfoValidator(req.body);
    if (validation_errors.length === 0) {
        try {
            const restaurant = await Restaurant.findOne({ _id: req.params.id, owner: req.user._id })

            if (!restaurant) {
                return res.status(404).send()
            }

            updates.forEach((update) => restaurant[update] = req.body[update])
            await restaurant.save()

            res.send(restaurant)

        } catch (e) {
            res.status(400).send(e)
        }
    } else {
        res.status(400).json({ Error: validation_errors });
    }

})

// @rout        DEL /api/v1/restaurants/restaurant/:id
// @desc        Delete Restaurant
// @return       Deleted Resturant
// @access      Private
router.delete('/restaurant/:id', passport.authenticate('jwt', { session: false }), async function (req, res) {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send({ Error: "Incorrect Restaurant Id" })
    }
    try {
        const restaurant = await Restaurant.findOneAndDelete({ _id: req.params.id, owner: req.user._id })

        if (!restaurant) {
            res.status(404).send()
        }

        res.send({ Deleted_Restaurant: restaurant })
    } catch (e) {
        res.status(500).send()
    }
});

module.exports = router