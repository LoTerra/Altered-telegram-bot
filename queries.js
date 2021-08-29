const axios = require('axios')
const numeral = require('numeral');

// Use swagger to query the contract 
// https://lcd.terra.dev/swagger-ui/#/Wasm/get_wasm_contracts__contractAddress__store
const altered_contract_address = `terra15tztd7v9cmv0rhyh37g843j8vfuzp8kw0k5lqv`;

const url = `https://lcd.terra.dev/wasm/contracts/${altered_contract_address}/store?query_msg=`;

const getContractInfo = async () => {
  try {
    let res = await axios.get(`${url}%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%22extra_token_info%22%3A%20%7B%7D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D`);
    let result = res.data.result;
    let totalSupply = parseInt(result.total_supply) / 1000000
    let treasury = (totalSupply * 0.15 )
    let team = (totalSupply * 0.25 )
    
    let circulatingSupply = totalSupply - treasury
    let community = circulatingSupply - team
    let contractInfo = [totalSupply, 
                        numeral(circulatingSupply).format('0,0.00'), 
                        numeral(community).format('0,0.00'),
                        numeral(team).format('0,0.00'), 
                        numeral(treasury).format('0,0.00'),
                       ];
    return contractInfo;
  } catch (e) {
    console.log(e);
  }
};

module.exports = { getContractInfo };