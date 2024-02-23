const Web3 = require('web3');
const fetch = require("node-fetch");

exports.handler = async (event, context) => {
    // Handle preflight (CORS) request
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 204,
            headers: {
                "Access-Control-Allow-Origin": "https://bsnprapp123.webflow.io, https://bsnprapp123.webflow.com",
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Methods": "POST, OPTIONS",
            },
            body: JSON.stringify({message: "You can use CORS headers"}),
        };
    }

    const { walletAddress } = JSON.parse(event.body);
    const apiKey = process.env.BSC_API_KEY; // Ensure this API key is set in your Netlify environment variables
    const url = `https://api.bscscan.com/api?module=account&action=balance&address=${walletAddress}&apikey=${apiKey}`;
    
    try {
        const response = await fetch(url);
        const result = await response.json();

        if (result.status === "1") {
            const balance = Web3.utils.fromWei(result.result, 'ether');
            const formattedBalance = parseFloat(balance).toFixed(4);

            // Assuming you have validated the origin, set CORS headers accordingly
            return {
                statusCode: 200,
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "https://bsnprapp123.webflow.io, https://bsnprapp123.webflow.com",
                    "Access-Control-Allow-Headers": "Content-Type",
                    "Access-Control-Allow-Methods": "POST, OPTIONS",
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
                "Access-Control-Allow-Origin": "https://bsnprapp123.webflow.io, https://bsnprapp123.webflow.com",
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Methods": "POST, OPTIONS",
            },
            body: JSON.stringify({ error: 'Failed to fetch balance' })
        };
    }
};

