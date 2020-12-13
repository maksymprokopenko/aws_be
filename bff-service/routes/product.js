const express = require('express');
const router = express.Router();
const axios = require('axios');

/* GET product by ID */
router.get('/', (req, res) => {
    const { method, query } = req;

    axios({
        method,
        url: process.env.product,
        params: query,
    }).then(data => {
        res.send(data.data);
    }).catch(error => {
        const { response } = error;

        res.status(response.status || 500);
        res.send(response.data);
    });
});

module.exports = router;
