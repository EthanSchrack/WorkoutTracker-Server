const express = require('express');
const router = express.Router();

const User = require('../../models/User');

router.get('/',(req, res) => {
    // res.send('testing get / user route')
    User.find()
        .then((users) => res.json(users))
        .catch((err) => res.status(404).json({ nousersfound: 'No Users Found'}));
});

router.get('/:id',(req, res) => {
    // res.send('testing get /:id route')
    User.findById(req.params.id)
        .then((user) => res.json(user))
        .catch((err) => res.status(404).json({ nouserfound: 'No User found'}));
});

router.put('/:id',(req, res) => {
    // res.send('testing put /:id route')
    User.findByIdAndUpdate(req.params.id, req.body)
        .then((user) => res.json({ msg: 'Updated successfully' }))
        .catch((err) =>
            res.status(400).json({ error: 'Unable to update the Database' })
        );
});

router.delete('/:id',(req, res) => {
    //res.send('testing delete /:id route')
    User.findByIdAndDelete(req.params.id)
        .then((user) => res.json({ msg: 'User entry deleted successfully' }))
        .catch((err) => res.status(404).json({ error: 'No such user' }));
});

router.post('/', (req,res) => {
    User.create(req.body)
        .then((user) => res.json({ msg: 'User added successfully' }))
        .catch((err) => res.status(400).json({ error: 'Unable to add this user' }));
});

module.exports = router;