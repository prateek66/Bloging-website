const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const CategoriesRouter = require('./routes/blogCategory')
const fs = require('fs');
require('./db/mongoose')


const post = require('./routes/post');
const category = require('./routes/blogCategory')


const app = express();


//app.use('/', post);
//app.use('/category',CategoriesRouter)


module.exports = app;