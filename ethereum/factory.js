import web3 from "./web3";
import campaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    campaignFactory.abi,
    '0x0fEb2A936c8D58eA56329d9C156ee01237898a3e'
);

export default instance;