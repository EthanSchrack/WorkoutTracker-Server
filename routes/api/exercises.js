const express = require('express');
const router = express.Router();

const Exercise = require('../../models/Exercise');

router.get('/',(req, res) => {
    // res.send('testing get / exercise route')
    Exercise.find()
        .then((exercises) => res.json(exercises))
        .catch((err) => res.status(404).json({ noexercisesfound: 'No Exercises Found'}));
});

router.get('/:id',(req, res) => {
    // res.send('testing get /:id route')
    Exercise.findById(req.params.id)
        .then((exercise) => res.json(exercise))
        .catch((err) => res.status(404).json({ noexercisefound: 'No Exercise found'}));
});

router.put('/:id',(req, res) => {
    // res.send('testing put /:id route')
    Exercise.findByIdAndUpdate(req.params.id, req.body)
        .then((exercise) => res.json({ msg: 'Updated successfully' }))
        .catch((err) =>
            res.status(400).json({ error: 'Unable to update the Database' })
        );
});

router.delete('/:id',(req, res) => {
    //res.send('testing delete /:id route')
    Exercise.findByIdAndDelete(req.params.id)
        .then((exercise) => res.json({ msg: 'Exercise entry deleted successfully' }))
        .catch((err) => res.status(404).json({ error: 'No such exercise' }));
});

router.post('/', (req,res) => {
    Exercise.create(req.body)
        .then((exercise) => res.json({ msg: 'Exercise added successfully' }))
        .catch((err) => res.status(400).json({ error: 'Unable to add this exercise' }));
});

module.exports = router;