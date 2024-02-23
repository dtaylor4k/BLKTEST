const Web3 = require('web3');

exports.handler = async (event, context) => {
    // CORS headers
    const headers = {
        "Access-Control-Allow-Origin": "*", // Or specify your domains
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        //"Origin, X-Requested-With, Content-Type, Accept, Authorization",
    };

    // Handle OPTIONS request for CORS preflight
    if (event.httpMethod === "OPTIONS") {
        return {
            statusCode: 200,
            headers,
            body: "", // No need to return any body for OPTIONS
        };
    }

    // Your existing code here
    const { walletAddress } = JSON.parse(event.body);
    const apiKey = process.env.BSC_API_KEY; // Make sure this API key is set in your Netlify environment variables
    const url = `https://api.bscscan.com/api?module=account&action=balance&address=${walletAddress}&apikey=${apiKey}`;
    
    try {
        const response = await fetch(url);
        const result = await response.json();

        if (result.status === "1") {
            const balance = Web3.utils.fromWei(result.result, 'ether');
            const formattedBalance = parseFloat(balance).toFixed(4);

            return {
                statusCode: 200,
                headers,
                body: JSON.stringify({ balance: formattedBalance }),
            };
        } else {
            throw new Error('Failed to fetch balance');
        }
    } catch (error) {
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: 'Failed to fetch balance' }),
        };
    }
};
