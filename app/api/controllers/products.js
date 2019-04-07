"use strict";

const productModel = require('../models/products');
module.exports = {
	create: function(req, res, next) {
		productModel.findOne({name: req.body.name}, function(err, res) {
			console.log(req.body.name);
			if (err)
				console.log(err);
			else
			{
				productModel.create({ name: req.body.name, description:  req.body.description,
					created: new Date(), updated: new Date(), status: 1}, function (err, result) {
					if (err)
						next(err);
					else
						res.json({status: "success", message: "Product added successfully!!!", data: null});
				});
			}
		});
	},
	getById: function(req, res, next) {
		productModel.findById(req.params.productId, function(err, productInfo){
			if (err) {
				next(err);
			} else {
				res.json({status:"success", message: "Product found!!!", data:{products: productInfo}});
			}
		});
	},
	getAll: function(req, res, next) {
		let productsList = [];
		productModel.find({}, function(err, products){
			if (err){
				next(err);
			} else{
				for (let product of products) {
					productsList.push({id: product._id, name: product.name, description: product.description,
						created: product.created, updated: product.updated, status: product.status});
				}
				res.json({status:"success", message: "Products list found!!!", data:{products: productsList}});
			}
		});
	},
	updateById: function(req, res, next) {
		productModel.findByIdAndUpdate(req.params.productId, {name:req.body.name, description: req.body.description,
			updated: new Date(), status: req.body.status}, function(err, productInfo){
			if(err)
				next(err);
			else {
				res.json({status:"success", message: "Product updated successfully!!!", data:null});
			}
		});
	},
	deleteById: function(req, res, next) {
		productModel.findByIdAndRemove(req.params.productId, function(err, productInfo){
			if(err)
				next(err);
			else {
				res.json({status:"success", message: "Product deleted successfully!!!", data:null});
			}
		});
	},
};
