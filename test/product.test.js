const request = require('./common.test');
const loginWithDefaultUser = require('./common.test');
const chai = require('./common.test');
const should = require('./common.test');
const cleanCollection = require('../app/api/models/products');
describe("# Product APIs", () => {
	const apiBase = process.env.API_BASE || '/';
	const newProduct = { name: 'Product-1',
		description: 'This is description',
	};
	let token;
	
	before(async ()=> {
		let resToken =  await loginWithDefaultUser();
		token = resToken.body.token;
		
	});
	it("should save the Product", () => {
		return request.post(apiBase + "/Product")
			.set("Authorization", token)
			.send(newProduct)
			.expect(200)
			.expect(res => {
				res.body.success.should.be.true;
				res.body.msg.should.equal("New Product is created successfully.");
			})
	});
	
	it("should get list of Products", () => {
		return cleanCollection().then(()=>{
			return request.post(apiBase + "/Product")
				.set("Authorization", token)
				.send(newProduct)
				.expect(200)
				.then(()=>{
					return request.get(apiBase + "/Product")
						.set("Authorization", token)
						.send()
						.expect(200)
						.expect(res =>{
							res.body.should.be.an('array').to.have.lengthOf(1);
							let item = res.body[0];
							item.should.have.property('title').to.equal(newProduct.title);
							item.should.have.property('summary').to.equal(newProduct.summary);
							item.should.have.property('description').to.equal(newProduct.description);
						});
				})
		})
		
	});
	
	
	it("should return 401 with expired token", () => {
		return request.post(apiBase + "/Product")
			.set("Authorization", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjcwMWQyNGQ2ZjIyYTJiZThiYjg1MzYiLCJ1c2VybmFtZSI6InRlc3RAdGVjaGJyaWouY29tIiwicGFzc3dvcmQiOiIkMmEkMTAkTEJNQy5tQVFxWWNmLjVZSlRlSVNlT1cvUVp1NWJ5WVN4anJmSGFQUTJZZVlkWXR6Y25lbFMiLCJfX3YiOjAsImlhdCI6MTUzNDQzODk0MywiZXhwIjoxNTM0NDM5MDYzfQ.zFMsJiny3At6vJRsjl8AzKnjlTMGVc1fdZnH2kwu6dQ")
			.send(newProduct)
			.expect(res => {
				res.body.message.should.equal("Your token has expired.")
			})
			.expect(401);
	});
});
