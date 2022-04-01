const IPFS = require('ipfs-api');
const ipfs = new IPFS({ host: 'gateway.pinata.cloud/ipfs', port: 5001, protocol: 'https' });

export default ipfs;
