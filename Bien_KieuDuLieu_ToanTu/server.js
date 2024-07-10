const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;
const EXCHANGE_RATE_API_URL = 'https://api.exchangerate-api.com/v4/latest/';

app.use(express.json());

app.post('/convert', async (req, res) => {
    const { fromCurrency, toCurrency, amount } = req.body;

    try {
        const response = await axios.get(`${EXCHANGE_RATE_API_URL}${fromCurrency}`);
        const rates = response.data.rates;
        const rate = rates[toCurrency];

        if (!rate) {
            return res.status(400).send({ error: 'Invalid currency code' });
        }

        const convertedAmount = amount * rate;
        res.send({ convertedAmount });
    } catch (error) {
        res.status(500).send({ error: 'Error fetching exchange rates' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
