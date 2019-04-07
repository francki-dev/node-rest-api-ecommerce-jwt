"use strict";

const express = require('express');
const logger = require('morgan');
const movies = require('./routes/products') ;
const users = require('./routes/users');
const bodyParser = require('body-parser');
const mongoose = require('./config/database'); //database configuration
const jwt = require('jsonwebtoken');
const app = express();
const port = 3000;
app.set('secretKey', 'fonciaFutureMission'); // jwt secret token

// connection to mongodb
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function(req, res){
	res.json({"Test coding" : "Build RESTFUL API for E-commerce with node.js, express.js, mongoDB, mongoose, JWT"});
});

// public route
app.use('/users', users);

// private route
app.use('/products', validateUser, movies);

app.get('/favicon.ico', function(req, res) {
	res.sendStatus(204);
});

function validateUser(req, res, next) {
	jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), function(err, decoded) {
		if (err) {
			res.json({status:"error", message: err.message, data:null});
		}else{
			req.body.userId = decoded.id;
			next();
		}
	});
}

// handle 404 error
app.use(function(req, res, next) {
	let err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// handle errors
app.use(function(err, req, res, next) {
	console.log(err);
	if(err.status === 404)
		res.status(404).json({message: "Code client :: Not found"});
	else
		res.status(500).json({message: "Code server :: Internal Server Error!!!"});
});

const server = app.listen(port, () => {
	console.log( `Node server listening on port ${port}`);
});

module.exports = server;
