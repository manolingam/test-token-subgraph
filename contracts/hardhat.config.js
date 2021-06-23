require('@nomiclabs/hardhat-waffle');

const GANACHE_ACCOUNT_PRIVATE_KEY = 'ACCOUNT PRIVATE KEY';

module.exports = {
  defaultNetwork: 'hardhat',
  networks: {
    ganache: {
      url: 'http://127.0.0.1:8545',
      defaultBalanceEther: 1000,
      accounts: [`0x${GANACHE_ACCOUNT_PRIVATE_KEY}`]
    }
  },
  solidity: {
    version: '0.8.0',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
};
