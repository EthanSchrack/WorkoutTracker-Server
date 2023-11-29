const express = require('express');
const router = express.Router();

const Item = require('../../models/Item');

router.get('/',(req, res) => {
    // res.send('testing get / item route')
    Item.find()
        .then((items) => res.json(items))
        .catch((err) => res.status(404).json({ noitemsfound: 'No Items Found'}));
});

router.get('/:id',(req, res) => {
    // res.send('testing get /:id route')
    Item.findById(req.params.id)
        .then((item) => res.json(item))
        .catch((err) => res.status(404).json({ noitemfound: 'No Item found'}));
});

router.put('/:id',(req, res) => {
    // res.send('testing put /:id route')
    Item.findByIdAndUpdate(req.params.id, req.body)
        .then((item) => res.json({ msg: 'Updated successfully' }))
        .catch((err) =>
            res.status(400).json({ error: 'Unable to update the Database' })
        );
});

router.delete('/:id',(req, res) => {
    //res.send('testing delete /:id route')
    Item.findByIdAndDelete(req.params.id)
        .then((item) => res.json({ msg: 'Item entry deleted successfully' }))
        .catch((err) => res.status(404).json({ error: 'No such item' }));
});

router.post('/', (req,res) => {
    Item.create(req.body)
        .then((item) => res.json({ msg: 'Item added successfully' }))
        .catch((err) => res.status(400).json({ error: 'Unable to add this item' }));
});

module.exports = router;