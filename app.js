const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
const mongoose = require('mongoose');
const cors = require('cors');

//const items = require('./routes/api/items');
//app.use('/api/items', items);

//connect database
app.use(cors({origin: true, credentials: true }));
app.use(express.json({ extended: false }));
app.get('/', (req, res) => res.send('Hello World!'));

const conn_str = 'mongodb+srv://trackerWorkout:workoutTracker123@workouttracker.0hmr5dd.mongodb.net/?retryWrites=true&w=majority';
mongoose.set('strictQuery', false);
mongoose.connect(conn_str,{
   useUnifiedTopology : true,
   //useNewUrlParser : true
})
.then(() => {
   app.listen(port)
console.log('MongoDB Connection Suceeded...');
})
.catch(err => { 
   console.log('Error in DB connection ');
   console.log( err);
});


const items = require('./routes/api/items');
app.use('/api/items', items);
