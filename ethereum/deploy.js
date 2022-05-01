const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const { abi:factoryAbi, evm:factoryEvm} = require('../backend/build/CampaignFactory.json');

 
const provider = new HDWalletProvider(
    "best van volcano rescue hint shift object front mixed elite atom disagree",
    'https://rinkeby.infura.io/v3/15c1d32581894b88a92d8d9e519e476c'
);
 
const web3 = new Web3(provider);
 
const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
 
  console.log('Attempting to deploy from account', accounts[0]);
 
  const result = await new web3.eth.Contract(factoryAbi)
    .deploy({ data: factoryEvm.bytecode.object })
    .send({ gas: '3000000', from: accounts[0] });
 
  console.log(JSON.stringify(factoryAbi));
  console.log('Contract deployed to', result.options.address);
  provider.engine.stop();
};
deploy();

// Attempting to deploy from account 0x37F22FD7783CE40b594953B298d66bc8a3F13D6C
// [{"inputs":[{"internalType":"uint256","name":"minimum","type":"uint256"}],"name":"createCampaign","outputs":[],"stateMutability":"nonpayable","type":"function","signature":"0xa3303a75"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"deployedCampaigns","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function","constant":true,"signature":"0x339d50a5"},{"inputs":[],"name":"getDeployedCampaigns","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function","constant":true,"signature":"0x4acb9d4f"}]
// Contract deployed to 0xF029D9B18EF33e240dB7d34771fC9b486D13Eec5