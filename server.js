const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const config = require('config');



const app = express();

//Bodyparser Middleware
app.use(express.json());

//DB config
const db = process.env.MONGODB_URI || config.get('mongoURI');

// connect to mongo
mongoose
    .connect(db, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true})
    .then(() => console.log('MongoDB connected..'))
    .catch(err => console.log(err));

// use routes
app.use('/api/items', require('./routes/api/Items'))
app.use('/api/user', require('./routes/api/user'))
app.use('/api/auth', require('./routes/api/auth'))


// Serve static assets if in production
if(process.env.NODE_ENV === 'production'){
    // Set static folder 
    console.log("just checking")
    app.use(express.static('client/build'));
    
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server started on port ${port}`));