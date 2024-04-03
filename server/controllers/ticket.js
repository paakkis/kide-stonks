const ticketRouter = require('express').Router()
const axios = require('axios');
const logger = require('../utils/logger')
const https = require('https');
const { getRequestId } = require('../utils/getRequestId');

EXTRA_ID = "d4adee2f5a49440e835ced5330470a69"

ticketRouter.post('/', async (req, res) => {

    const baseUrl = 'https://api.kide.app/api';
  
    const data = req.body;
    const agent = new https.Agent({
      rejectUnauthorized: false,
    });
    
    const options = {
        method: 'POST',
        httpsAgent: agent,
        body: data,
        json: true,
        headers: {
            'Authorization': req.headers.authorization,
            'X-Requested-Token-C69': getRequestId(data.toCreate[0].inventoryId, EXTRA_ID),
            'X-Requested-With': 'XMLHttpRequest',
        }
    };


    try {
      const response = await axios.post(`${baseUrl}/reservations`, data, options, {});
      res.json(response.data); // Forwarding the response from the kide.app API to the client
    } catch (error) {
      console.error('Error when calling kide.app API:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = ticketRouter