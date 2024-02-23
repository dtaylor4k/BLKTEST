const Web3 = require('web3');
const fetch = require("node-fetch");

exports.handler = async (event, context) => {
    const { walletAddress } = JSON.parse(event.body);
    const apiKey = process.env.BSC_API_KEY; // Ensure this API key is set in your Netlify environment variables
    const url = `https://api.bscscan.com/api?module=account&action=balance&address=${walletAddress}&apikey=${apiKey}`;
    const allowedDomains = [
        'https://bsnprapp123.webflow.io',
        'https://bsnprapp123.webflow.com'
    ];
    
    // Check the Origin header of the incoming request
    const origin = event.headers.origin;
    
    try {
        const response = await fetch(url);
        const result = await response.json();

        if (result.status === "1") {
            const balance = Web3.utils.fromWei(result.result, 'ether');
            const formattedBalance = parseFloat(balance).toFixed(4);

            // Set Access-Control-Allow-Origin based on the Origin of the request
            let headers = {
                "Content-Type": "application/json",
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Methods": "POST, OPTIONS"
            };
            if (allowedDomains.includes(origin)) {
                headers["Access-Control-Allow-Origin"] = origin; // Reflect the origin if it's allowed
            }

            return {
                statusCode: 200,
                headers: headers,
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
                "Access-Control-Allow-Origin": allowedDomains.join(" "), // Fallback, but not effective for actual browser requests
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Methods": "POST, OPTIONS"
            },
            body: JSON.stringify({ error: 'Failed to fetch balance' })
        };
    }
};
