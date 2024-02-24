
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

    const apiKey = process.env.ETH_API_KEY;
    const { walletAddress, networkType } = JSON.parse(event.body);
    const web3ProviderUrl = getWeb3ProviderUrl(networkType);
    const web3Instance = new Web3(web3ProviderUrl);

    try {
        const balance = await web3Instance.eth.getBalance(walletAddress);
        const balanceInNativeToken = web3Instance.utils.fromWei(balance, 'ether');

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ balance: balanceInNativeToken })
        };
    } catch (error) {
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: error.message })
        };
    }
};

function getWeb3ProviderUrl(networkType) {
    switch (networkType) {
        case "Ethereum": return `https://mainnet.infura.io/v3/${apiKey}`;
        case "Polygon": return `https://polygon-mainnet.infura.io/v3/${apiKey}`;
        case "Optimism": return `https://optimism-mainnet.infura.io/v3/${apiKey}`;
        case "Arbitrum": return `https://arbitrum-mainnet.infura.io/v3/${apiKey}`;
        case "Avalanche": return `https://avalanche-mainnet.infura.io/v3/${apiKey}`;
        default: throw new Error(`Unsupported network type: ${networkType}`);
    }
}
