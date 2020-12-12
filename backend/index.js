const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use(cors());

app.listen(PORT, () =>
    console.log("Server started on PORT", PORT));

mongoose.connect(
    process.env.MONGODB_CONNECTION_STRING, { useUnifiedTopology: true, useNewUrlParser: true },
    (err) => {
        if (err) {
            console.error(err);
            throw (err);
        }
        console.log("Connected to MongoDB");
    }
);
mongoose.set('useCreateIndex', true);

app.use('/users', require('./routes/users'));