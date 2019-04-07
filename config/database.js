"use strict";

const mongoose = require('mongoose');
const mongoDB = 'mongodb://localhost/db_api_restful_node';
mongoose.connect(mongoDB, {useNewUrlParser: true});
mongoose.Promise = global.Promise;
module.exports = mongoose;
