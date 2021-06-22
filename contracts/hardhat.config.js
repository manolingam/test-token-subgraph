require('hardhat/config');
require('@nomiclabs/hardhat-ganache');
require('@nomiclabs/hardhat-ethers');
require('@nomiclabs/hardhat-etherscan');
require('@nomiclabs/hardhat-waffle');
require('hardhat-ethernal');
require('solidity-coverage');

module.exports = {
  defaultNetwork: 'ganache',
  networks: {
    ganache: {
      url: 'http://127.0.0.1:8555',
      defaultBalanceEther: 1000
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
