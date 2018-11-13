const express = require('express');

const app = express();


app.get('/home', (req, res) => {

    res.json('Probando');

});

module.exports = app;