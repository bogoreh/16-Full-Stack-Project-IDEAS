const axios = require('axios');

exports.getCurrentPrice = async (req, res) => {
  try {
    const response = await axios.get(
      'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd'
    );
    const price = response.data.bitcoin.usd;
    res.json({ price });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Failed to fetch price' });
  }
};