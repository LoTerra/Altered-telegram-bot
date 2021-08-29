const axios = require('axios')
const numeral = require('numeral');

const pool_address = `terra18adm0emn6j3pnc90ldechhun62y898xrdmfgfz`;

const getAltePrice = async () => {
  const pool = await axios.get(`https://lcd.terra.dev/wasm/contracts/${pool_address}/store?query_msg=%20%20%7B%20%20%20%22pool%22%3A%20%7B%7D%20%7D`)
  
  let alteAmount = pool.data.result.assets[0].amount
  let ustAmount = pool.data.result.assets[1].amount
  
  let price = parseInt(ustAmount) / parseInt(alteAmount)
  return price
}

module.exports = { getAltePrice };