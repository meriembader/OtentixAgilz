require('dotenv').config();
const key = process.env.pinataApiKey;
const secret = process.env.pinataSecretApiKey;
const axios = require('axios');

 const pinJSONToIPFS = async(JSONBody, data) => {
    const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
 const JWT ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIyZGI4Yzg5NS1iNDc2LTRhNDQtOGFkYi1hYmI3YTI3Y2UwYWIiLCJlbWFpbCI6Im1lcmllbS5iYWRlcjFAZXNwcml0LnRuIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZX0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6Ijk0NjMyMzEwNTlhOWQ0NTUwYzdmIiwic2NvcGVkS2V5U2VjcmV0IjoiNzY3YmI1NWI0YTBjZmM0MzQ5NWRjZWUwZjIxYmQ3YmIzZDNkNTk0NWU4M2RlMWQzOTRmN2ZjMDQxNjk2YWFhZSIsImlhdCI6MTY0OTQxMTE1OX0.wMdcVuUjDZDuHNQ5urLiN1sWxDvfZ_oe6zYF3up8BvA"
    return axios
        .post(url, data, {
            headers: {
            'Content-Type': `multipart/form-data; boundary= ${data._boundary}`,
            "Authorization": `Bearer ${JWT}`,
           // 'pinataApiKey': "78fb0ae226b2a0f74044",
          //  'pinataSecretApiKey': "35cb7148151e5af3b291c47560e9b8ea61547c38f02c34838bcf0d2d73d554cb",
            }
        })
        .then(function (response) {
           return {
               success: true,
               pinataUrl: "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash
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
export default pinJSONToIPFS;

/* 
            */