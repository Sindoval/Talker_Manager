const express = require('express');
const talkerRoutes = require('./routes/talkerRoutes');

const app = express();

app.use(express.json());
app.use('/talker', talkerRoutes);

module.exports = app;
