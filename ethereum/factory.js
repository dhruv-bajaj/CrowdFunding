import web3 from "./web3";
import campaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    campaignFactory.abi,
    '0xd11Dfd92A4c05a045975A1696cF106695F563d0b'
);

export default instance;