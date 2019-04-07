"use strict";

const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ProductSchema = new Schema({
	name: {
		type: String,
		trim: true,
		required: true,
	},
	description: {
		type: String,
		trim: true,
		required: true,
	},
	created: {
		type: Date,
		trim: true,
		required: false
	},
	updated: {
		type: Date,
		trim: true,
		required: false
	},
	status: {
		type: Number,
		trim: true,
		required: true
	}
});

module.exports = mongoose.model('Product', ProductSchema);
