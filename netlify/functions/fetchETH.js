const Web3 = require('web3');

exports.handler = async (event) => {
    const headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    };

    if (event.httpMethod === "OPTIONS") {
        return { statusCode: 200, headers, body: "" };
    }

    let apiKey, walletAddress, networkType, web3ProviderUrl;

    try {
        const body = JSON.parse(event.body);
        apiKey = process.env.ETH_API_KEY;
        walletAddress = body.walletAddress;
        networkType = body.networkType;
        web3ProviderUrl = getWeb3ProviderUrl(networkType, apiKey);
    } catch (error) {
        console.error("Error parsing event body or setting up environment:", error);
        return { statusCode: 400, headers, body: JSON.stringify({ error: "Bad request" }) };
    }

    const web3Instance = new Web3(web3ProviderUrl);

    try {
        const balance = await web3Instance.eth.getBalance(walletAddress);
        const balanceInEther = Web3.utils.fromWei(balance, 'ether');
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ balance: balanceInEther }),
        };
    } catch (error) {
        console.error("Error fetching balance from blockchain:", error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: "Failed to fetch balance" }),
        };
    }
};

function getWeb3ProviderUrl(networkType, apiKey) {
    switch (networkType) {
        case "Ethereum": return `https://mainnet.infura.io/v3/${apiKey}`;
        case "Polygon": return `https://polygon-mainnet.infura.io/v3/${apiKey}`;
        case "Optimism": return `https://optimism-mainnet.infura.io/v3/${apiKey}`;
        case "Arbitrum": return `https://arbitrum-mainnet.infura.io/v3/${apiKey}`;
        case "Avalanche": return `https://avalanche-mainnet.infura.io/v3/${apiKey}`;
        default: 
            console.error("Unsupported network type:", networkType);
            throw new Error(`Unsupported network type: ${networkType}`);
    }
}
