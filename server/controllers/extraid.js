const extraIdRouter = require('express').Router()
const axios = require('axios');
const { getLatestExtraIdLocal } = require('../utils/getExtraId');

extraIdRouter.get('/', async (req, res) => {
    try {
        const extraId = await getLatestExtraIdLocal();
        res.json({ extraId });
      } catch (error) {
        console.error('Error when fetching extra ID', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
});


module.exports = extraIdRouter