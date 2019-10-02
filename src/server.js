const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();

const port = process.env.PORT || 5000;

mongoose.connect('mongodb://localhost:27017/users', { 
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(express.json());
app.use(routes);

app.listen(port, () => console.log(`Listening on port ${port}`));