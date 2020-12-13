const express = require('express');
const router = express.Router();
const axios = require('axios');

/* GET all products and POST to create the product */
router.all('/', (req, res) => {
    const { method, body } = req;
    const prepareConfig = {
        method,
        url: process.env.products,
    };

    if (method === 'POST') {
        prepareConfig.data = body;
    }

    axios(prepareConfig).then(data => {
        res.send(JSON.stringify(data.data));
    }).catch(error => {
        const { response } = error;

        res.status(response.status || 500);
        res.send(response.data);
    });
});

module.exports = router;
