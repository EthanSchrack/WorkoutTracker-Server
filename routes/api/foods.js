const express = require('express');
const router = express.Router();

const Food = require('../../models/Food');

router.get('/',(req, res) => {
    // res.send('testing get / item route')
    Food.find()
        .then((foods) => res.json(foods))
        .catch((err) => res.status(404).json({ nofoodsfound: 'No Foods Found'}));
});

router.get('/:id',(req, res) => {
    // res.send('testing get /:id route')
    Food.findById(req.params.id)
        .then((item) => res.json(item))
        .catch((err) => res.status(404).json({ nofoodfound: 'No Food found'}));
});

router.put('/:id',(req, res) => {
    // res.send('testing put /:id route')
    Food.findByIdAndUpdate(req.params.id, req.body)
        .then((item) => res.json({ msg: 'Updated successfully' }))
        .catch((err) =>
            res.status(400).json({ error: 'Unable to update the Database' })
        );
});

router.delete('/:id',(req, res) => {
    //res.send('testing delete /:id route')
    Food.findByIdAndDelete(req.params.id)
        .then((item) => res.json({ msg: 'Food entry deleted successfully' }))
        .catch((err) => res.status(404).json({ error: 'No such food' }));
});

router.post('/', (req,res) => {
    Food.create(req.body)
        .then((item) => res.json({ msg: 'Food added successfully' }))
        .catch((err) => res.status(400).json({ error: 'Unable to add this food' }));
});

module.exports = router;