const request = require("./common.test"),
	loginWithDefaultUser = require("./common.test"),
	cleanExceptDefaultUser  = require("./common.test");

describe("# Auth APIs", () => {
	const apiBase = process.env.API_BASE || '/api';
	const newUser = { "name": "Administrator", "login": "admin", "password": "admin123456" };
	it("should create user", () => {
		return cleanExceptDefaultUser().then(() => {
			return request.post(apiBase + '/users/register')
				.send(newUser)
				.expect(200)
				.then(res => {
					res.body.success.should.be.true;
				});
		});
	});
	
	it("should retrieve the token", () => {
		return cleanExceptDefaultUser().then(res => {
			return loginWithDefaultUser().then(res => {
				res.status.should.equal(200);
				res.body.success.should.be.true;
				res.body.token.should.not.be.empty;
			});
		});
	});
	
	it("should not login with the right user but wrong password", () => {
		return request.post(apiBase + '/users/authenticate')
			.send({ "username": newUser.username, "password": "random" })
			.expect(401);
	});
	
	it("should return invalid credentials error", () => {
		return request.post(apiBase + '/users/authenticate')
			.send({ "username":  newUser.username, "password": "" })
			.expect(401)
			.then(res => {
				return request.post(apiBase + '/users/authenticate')
					.send({ "username":  newUser.username, "password": "mypass" })
					.expect(401);
			});
	});
});
