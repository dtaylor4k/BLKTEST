const Web3 = require('web3');

exports.handler = async (event) => {
    // CORS headers
    const headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    };

    if (event.httpMethod === "OPTIONS") {
        return { statusCode: 200, headers, body: "" };
    }


    const { walletAddress, networkType } = JSON.parse(event.body);
    const apiUrl = getInfuraApiUrl(networkType, walletAddress, process.env.ETH_API_KEY);

    try {

        const response = await fetch(apiUrl, { headers: { 'Accept': 'application/json' } });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const balanceInWei = data.result;
        const balanceInEther = Web3.utils.fromWei(balanceInWei, 'ether');

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

function getInfuraApiUrl(networkType, walletAddress, apiKey) {
    switch (networkType) {
        case "Ethereum":
            return `https://mainnet.infura.io/v3/${apiKey}/eth_getBalance?params=["${walletAddress}", "latest"]`;
        case "Polygon":
            return `https://polygon-mainnet.infura.io/v3/${apiKey}/eth_getBalance?params=["${walletAddress}", "latest"]`;
        case "Optimism":
            return `https://optimism-mainnet.infura.io/v3/${apiKey}/eth_getBalance?params=["${walletAddress}", "latest"]`;
        case "Arbitrum":
            return `https://arbitrum-mainnet.infura.io/v3/${apiKey}/eth_getBalance?params=["${walletAddress}", "latest"]`;
        case "Avalanche":
            return `https://avalanche-mainnet.infura.io/v3/${apiKey}/eth_getBalance?params=["${walletAddress}", "latest"]`;
        default:
            throw new Error(`Unsupported network type: ${networkType}`);
    }
}
