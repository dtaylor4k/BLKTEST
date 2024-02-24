// Import the node-fetch module
//const fetch = require("node-fetch");

exports.handler = async (event) => {
    // CORS headers
    const headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    };

    // Respond to OPTIONS request for CORS preflight
    if (event.httpMethod === "OPTIONS") {
        return { statusCode: 200, headers, body: "" };
    }

    // Parse the request body to get wallet address and network type
    const { walletAddress, networkType } = JSON.parse(event.body);
    const apiKey = process.env.ETH_API_KEY; // Ensure this is set in your Netlify environment variables
    const url = getInfuraUrl(networkType, walletAddress, apiKey);

    try {
        // Use node-fetch to call the Infura API
        const response = await fetch(url);
        const data = await response.json();

        // Check if the request was successful
        if (!response.ok || data.error) {
            throw new Error(data.error?.message || "Failed to fetch balance");
        }

        // Convert the balance from Wei to Ether (or the native token unit)
        const balanceInEther = (parseInt(data.result, 10) / 1e18).toFixed(4);

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ balance: balanceInEther })
        };
    } catch (error) {
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: error.message })
        };
    }
};

// Helper function to generate the Infura API URL based on the network type
function getInfuraUrl(networkType, walletAddress, apiKey) {
    let networkUrl;
    switch (networkType) {
        case "Ethereum":
            networkUrl = "mainnet";
            break;
        case "Polygon":
            networkUrl = "polygon-mainnet";
            break;
        case "Optimism":
            networkUrl = "optimism-mainnet";
            break;
        case "Arbitrum":
            networkUrl = "arbitrum-mainnet";
            break;
        case "Avalanche":
            networkUrl = "avalanche-mainnet";
            break;
        default:
            throw new Error(`Unsupported network type: ${networkType}`);
    }
    return `https://api.infura.io/v1/jsonrpc/${networkUrl}/eth_getBalance?params=["${walletAddress}", "latest"]&apikey=${apiKey}`;
}
