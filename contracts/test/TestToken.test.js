const { expect } = require('chai');

describe('TestToken', function () {
  it('Should return the token name and symbol once deployed', async function () {
    const TestToken = await ethers.getContractFactory('TestToken');
    const testToken = await TestToken.deploy();
    await testToken.deployed();

    expect(await testToken.name().to.equal('Test Token'));
    expect(await testToken.symbol().to.equal('TEST'));
  });
});
