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
    const web3 = new Web3(getWeb3ProviderUrl(networkType, process.env.INFURA_API_KEY));

    try {
        // Fetch balance in Wei
        const balanceInWei = await web3.eth.getBalance(walletAddress);
        // Convert balance to Ether
        const balanceInEther = web3.utils.fromWei(balanceInWei, 'ether');

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ balance: balanceInEther })
        };
    } catch (error) {
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: `Failed to fetch balance: ${error.message}` })
        };
    }
};

function getWeb3ProviderUrl(networkType, apiKey) {
    switch (networkType) {
        case "Ethereum":
            return `https://mainnet.infura.io/v3/${apiKey}`;
        case "Polygon":
            return `https://polygon-mainnet.infura.io/v3/${apiKey}`;
        case "Optimism":
            return `https://optimism-mainnet.infura.io/v3/${apiKey}`;
        case "Arbitrum":
            return `https://arbitrum-mainnet.infura.io/v3/${apiKey}`;
        case "Avalanche":
            return `https://avalanche-mainnet.infura.io/v3/${apiKey}`;
        default:
            throw new Error(`Unsupported network type: ${networkType}`);
    }
}
