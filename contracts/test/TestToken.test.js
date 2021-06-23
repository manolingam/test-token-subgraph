const { expect } = require('chai');

describe('TestToken Contract', async () => {
  let testToken, accountOne, accountTwo;

  beforeEach(async () => {
    let TestToken = await ethers.getContractFactory('TestToken');
    testToken = await TestToken.deploy();
    await testToken.deployed();
    let accounts = await ethers.getSigners();
    accountOne = accounts[0];
    accountTwo = accounts[1];
  });

  describe('Contract', async () => {
    it('Should have right token name', async () => {
      expect(await testToken.name()).to.equal('Test Token');
    });

    it('Should have the right token symbol', async () => {
      expect(await testToken.symbol()).to.equal('TEST');
    });

    it('Should have the right decimals', async () => {
      expect(await testToken.decimals()).to.equal(18);
    });

    // it('Should have the right token supply', async () => {
    //   let totalSupply = await testToken.totalSupply();
    //   expect(await testToken.balanceOf('0x0').to.equal(totalSupply);
    // });
  });

  describe('Transactions', async () => {
    beforeEach(async () => {
      await testToken.mint(accountOne.address, 50);
    });

    it('Should mint the right amount of tokens', async () => {
      let accountOneBalance = await testToken.balanceOf(accountOne.address);
      expect(accountOneBalance).to.equal(50);
    });

    it('Should transfer the right amount of tokens', async () => {
      await testToken.connect(accountOne).transfer(accountTwo.address, 25);
      let accountOneBalance = await testToken.balanceOf(accountOne.address);
      let accountTwoBalance = await testToken.balanceOf(accountTwo.address);
      expect(accountOneBalance).to.equal(25);
      expect(accountTwoBalance).to.equal(25);
    });

    it('Should fail if sender does not have enough balance', async () => {
      await expect(
        testToken.connect(accountOne).transfer(accountTwo.address, 100)
      ).to.be.revertedWith('not enough balance');
    });

    it('Should approve and allow the spender to spend tokens', async () => {
      await testToken.connect(accountOne).approve(accountTwo.address, 10);
      await testToken
        .connect(accountTwo)
        .transferFrom(accountOne.address, accountTwo.address, 10);

      let accountOneBalance = await testToken.balanceOf(accountOne.address);
      let accountTwoBalance = await testToken.balanceOf(accountTwo.address);

      expect(accountOneBalance).to.equal(50 - accountTwoBalance);
    });
  });
});
