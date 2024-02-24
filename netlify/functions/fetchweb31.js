const Web3 = require('web3');
const web3 = new Web3(); // Assuming you only need utils and not a provider

exports.handler = async (event) => {
    const headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    };

    if (event.httpMethod === "OPTIONS") {
        return { statusCode: 200, headers, body: "" };
    }

    const { walletAddress, networkType } = JSON.parse(event.body);
    
    const apiKeys = {
        Ethereum: process.env.ETH_API_KEY,
        Solana: process.env.SOL_API_KEY,
        Polygon: process.env.POLY_API_KEY,
        Arbitrum: process.env.ARB_API_KEY,
        Optimism: process.env.OPT_API_KEY,
        Base: process.env.BASE_API_KEY,
    };

    const url = getAlchemyApiUrl(networkType, apiKeys);

    try {
        const body = createRequestBody(networkType, walletAddress);
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });

        const data = await response.json();

        if (data.error) throw new Error(data.error.message);

        const balance = extractBalance(networkType, data);

        return { statusCode: 200, headers, body: JSON.stringify({ balance: balance }) };
    } catch (error) {
        return { statusCode: 500, headers, body: JSON.stringify({ error: error.message }) };
    }
};

function getAlchemyApiUrl(networkType, apiKeys) {
    switch (networkType) {
        case "Ethereum": return `https://eth-mainnet.g.alchemy.com/v2/${apiKeys['Ethereum']}`;
        case "Polygon": return `https://polygon-mainnet.g.alchemy.com/v2/${apiKeys['Polygon']}`;
        case "Optimism": return `https://opt-mainnet.g.alchemy.com/v2/${apiKeys['Optimism']}`;
        case "Arbitrum": return `https://arb-mainnet.g.alchemy.com/v2/${apiKeys['Arbitrum']}`;
        case "Solana": return `https://solana-mainnet.g.alchemy.com/v2/${apiKeys['Solana']}`;
        case "Base": return `https://base-mainnet.g.alchemy.com/v2/${apiKeys['Base']}`;
        default: throw new Error(`Unsupported network type: ${networkType}`);
    }
}

function createRequestBody(networkType, walletAddress) {
    if (networkType === "Solana") {
        return {
            "jsonrpc": "2.0",
            "id": 1,
            "method": "getBalance",
            "params": [walletAddress]
        };
    } else {
        
        return {
            "jsonrpc": "2.0",
            "method": "eth_getBalance",
            "params": [walletAddress, "latest"],
            "id": 1
        };
    }
}

function extractBalance(networkType, data) {
    if (networkType === "Solana") {
        return (data.result.value / 1e9).toFixed(4);
    } else {
        
        return Web3.utils.fromWei(data.result, 'ether');
    }
}
