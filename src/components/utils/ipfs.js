require('dotenv').config();
const key = process.env.pinataApiKey;
const secret = process.env.pinataSecretApiKey;
const axios = require('axios');

 const pinFileToIPFS = async(JSONBody, data) => {
    const url =  `https://otentix.mypinata.cloud/pinning/pinFileToIPFS`

      //making axios POST request to Pinata 
      //const JWT = process.env.JWT;

       return axios
        .post(url, data, {
            headers: {
              pinata_api_key: key,
              pinata_secret_api_key: secret,
              'Content-Type':`multipart/form-JSONBody; boundary= ${JSONBody._boundary}`,
              // Authorization : `Bearer ${JWT}`,
            }
           
        })
        .then(function (response) {
           return {
               success: true,
               pinataUrl: "https://otentix.mypinata.cloud/ipfs/" + response.data.IpfsHash
           };
        })
        .catch(function (error) {
            console.log(error)

            return {
                success: false,
                message: error.message,
            }

    });
};  
export default pinFileToIPFS;
