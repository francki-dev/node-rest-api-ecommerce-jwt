process.env.NODE_ENV = "test";
process.env.API_BASE = "/";

const User = require('../app/api/models/users');
const express = require( '../server');

const request = require("supertest")(express);
const chai = require("chai");
const should = chai.should();

const defaultUser = { "username": "admin", "password": "admin" };

const createUser = async () => {
	const UserModel = new User(defaultUser);
	await UserModel.save();
};

const getDefaultUser = async () => {
	let users = await User.find({ "username" : defaultUser.username });
	if (users.length === 0) {
		await createUser();
		return getDefaultUser();
	} else {
		return users[0];
	}
};

const loginWithDefaultUser = async () => {
	let user = await getDefaultUser();
	return request.post(process.env.API_BASE + "users/authenticate")
		.send({ "username": defaultUser.username, "password": defaultUser.password })
		.expect(200);
};

const cleanExceptDefaultUser = async () => {
	let user = await getDefaultUser();
	await User.deleteMany({ "username": {$ne: user.username}});
};

module.exports = {request, chai, should, loginWithDefaultUser, cleanExceptDefaultUser};
