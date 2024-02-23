const Web3 = require('web3');
const fetch = require("node-fetch");

exports.handler = async (event) => {
    // Handle OPTIONS request for CORS preflight
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*", // Adjust as necessary
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Methods": "POST, OPTIONS"
            },
            body: ""
        };
    }

    const { walletAddress } = event.body ? JSON.parse(event.body) : {};
    // Use a safe default if body parsing fails or is empty
    if (!walletAddress) {
        return {
            statusCode: 400,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify({ error: 'walletAddress not provided' })
        };
    }

    const apiKey = process.env.BSC_API_KEY;
    const url = `https://api.bscscan.com/api?module=account&action=balance&address=${walletAddress}&apikey=${apiKey}`;

    try {
        const response = await fetch(url);
        const result = await response.json();

        if (result.status === "1") {
            const balance = Web3.utils.fromWei(result.result, 'ether');
            const formattedBalance = parseFloat(balance).toFixed(4);

            return {
                statusCode: 200,
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers": "Content-Type",
                    "Access-Control-Allow-Methods": "POST, OPTIONS"
                },
                body: JSON.stringify({ balance: formattedBalance })
            };
        } else {
            throw new Error('Failed to fetch balance');
        }
    } catch (error) {
        return {
            statusCode: 500,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Methods": "POST, OPTIONS"
            },
            body: JSON.stringify({ error: error.message || 'Failed to fetch balance' })
        };
    }
};
