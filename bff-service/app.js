require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// routes
const indexRouter = require('./routes/index');
const productsRouter = require('./routes/products');
const productRouter = require('./routes/product');

// app
const app = express();

// port
const port = process.env.PORT || 3000;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/products', productsRouter);
app.use('/product', productRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
    res.status(502);
    res.send('Cannot process request! Please use /product or /products request URL.');
});

app.listen(port, () => {
    console.log(`Application started on ${port} port.`);
});
