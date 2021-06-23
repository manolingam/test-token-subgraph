const hre = require('hardhat');
const fs = require('fs');

async function main() {
  const TestToken = await hre.ethers.getContractFactory('TestToken');
  const testToken = await TestToken.deploy();

  await testToken.deployed();

  console.log('Test Token deployed to:', testToken.address);

  const data = JSON.parse(testToken.interface.format('json'));

  fs.writeFileSync('../subgraph/abis/TestToken.json', JSON.stringify(data));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
