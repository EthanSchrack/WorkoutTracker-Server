const express = require('express');
const router = express.Router();
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");
const User = require('../../models/User');

router.get('/', auth, async (req, res) => {
    const user = await User.findById(req.user);
    res.json({
        username: user.username,
        id: user._id,
    });
});

// sign up route
router.post('/signup', async (req,res) => {
    try {
        const { email, password, confirmPassword, username } = req.body;
        if (!email || !password || !username || !confirmPassword) {
            return res.status(400).json({msg: "Please enter all the fields" });
        }
        if (password.length < 6) {
            return res
                .status(400)
                .json({msg: "Password should be at least six characters"});
        }
        if (confirmPassword != password) {
            return res.status(400).json({ msg: "Passwords do not match"});
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res
            .status(400)
            .json({ msg: "Email address already in use"});
        }
        const hashedPassword = await bcryptjs.hash(password, 8);
        const newUser = new User({ email, password: hashedPassword, username });

        const savedUser = await newUser.save();
        console.log(savedUser.username);
        res.json(savedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//Login route
router.post('/login', async (req, res) => {
    try {
        const {email, password} = req.body;
        if (!email || !password) {
            return res.status(400).json({msg: "Please enter all the fields" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res
                .status(400)
                .send({ msg: "User with this email does not exist"});
        }

        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send({ msg: "Incorrect password" })
        }
        const token = jwt.sign({ id: user._id }, "passwordKey");
        res.json({ token, user: { id: user._id, username: user.username }});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//Check for valid token
router.post("/tokenIsValid", async (req, res) => {
    try {
        const token = req.header("x-auth-token");
        if (!token) return res.json(false);
        const verified = jwt.verify(token, "passwordKey");
        if (!verified) return res.json(false);
        const user = await User.findById(verified.id);
        if (!user) return res.json(false);
        return res.json(true);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// router.get('/:id',(req, res) => {
//     // res.send('testing get /:id route')
//     User.findById(req.params.id)
//         .then((user) => res.json(user))
//         .catch((err) => res.status(404).json({ nouserfound: 'No User found'}));
// });

// router.put('/:id',(req, res) => {
//     // res.send('testing put /:id route')
//     User.findByIdAndUpdate(req.params.id, req.body)
//         .then((user) => res.json({ msg: 'Updated successfully' }))
//         .catch((err) =>
//             res.status(400).json({ error: 'Unable to update the Database' })
//         );
// });

// router.delete('/:id',(req, res) => {
//     //res.send('testing delete /:id route')
//     User.findByIdAndDelete(req.params.id)
//         .then((user) => res.json({ msg: 'User entry deleted successfully' }))
//         .catch((err) => res.status(404).json({ error: 'No such user' }));
// });




module.exports = router;