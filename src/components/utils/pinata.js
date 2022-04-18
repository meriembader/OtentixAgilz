require("dotenv").config()
const key = process.env.pinataApiKey
const secret = process.env.pinataSecretApiKey
const axios = require("axios")

export const pinJSONToIPFS = async (JSONBody) => {
  const url =  `http://otentix.mypinata.cloud/pinning/pinFileToIPFS`

  //making axios POST request to Pinata ⬇️
  return axios
    .post(url, JSONBody, {
       // maxContentLength: "Infinity",
        
      headers: {
        pinata_api_key: key,
        pinata_secret_api_key: secret,
      },
    })
    .then(function (response) {
      return {
        success: true,
        pinataUrl:
          "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash,
      }
    })
    .catch(function (error) {
      console.log(error)
      return {
        success: false,
        message: error.message,
      }
    })
}
