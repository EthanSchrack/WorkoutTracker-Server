const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
const mongoose = require('mongoose');
const cors = require('cors');
const items = require('./routes/api/items');

//Connect Database
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({extended: false}));
app.get('/', (req, res) => res.send('Hello world!'));
app.use('/api/items', items);
app.get('/user/:id', (req, res) => {
    res.send(`user ${req.params.id}`)
});

const conn_str = 'mongodb+srv://eschrack:7uxUwmeiuq6xXUZa@atlascluster.azhp7d6.mongodb.net/?retryWrites=true&w=majority'
mongoose.set('strictQuery', false);
mongoose.connect(conn_str)
.then(() => {
    app.listen(port)
    console.log(`MongoDB Connection Suceeded...`)
    console.log(`Server running on port ${port}`)
})
.catch(err => {
    console.log(`Error in DB Connection ${err}`);
});





// eschrack
// 7uxUwmeiuq6xXUZa