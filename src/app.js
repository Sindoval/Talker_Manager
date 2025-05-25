const express = require('express');
const talkerRoutes = require('./routes/talkerRoutes');
const loginRoutes = require('./routes/loginRoutes');

const app = express();

app.use(express.json());
app.use('/talker', talkerRoutes);
app.use('/login', loginRoutes);

module.exports = app;
