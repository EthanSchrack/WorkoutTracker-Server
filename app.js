const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
const mongoose = require('mongoose');
const cors = require('cors');

const users = require('./routes/api/users');
const exercises = require('./routes/api/exercises');
const foods = require('./routes/api/foods');

//connect database
app.use(cors({origin: true, credentials: true }));
app.use(express.json({ extended: false }));
app.get('/', (req, res) => res.send('Hello World!'));
// Routes for different models
app.use('/api/users', users);
app.use('/api/exercises', exercises);
app.use('/api/foods', foods);

app.get('/user/:id', (req, res) => {
    res.send(`user ${req.params.id}`)
});

const conn_str = 'mongodb+srv://trackerWorkout:workoutTracker123@workouttracker.0hmr5dd.mongodb.net/?retryWrites=true&w=majority';
mongoose.set('strictQuery', false);
mongoose.connect(conn_str,{
   useUnifiedTopology : true,
   //useNewUrlParser : true
})
.then(() => {
   app.listen(port)
console.log('MongoDB Connection Suceeded...');
console.log(`Server running on port ${port}`)
})
.catch(err => { 
   console.log('Error in DB connection ');
   console.log(err);
});
