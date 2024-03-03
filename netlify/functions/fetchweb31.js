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

    const url = getAlchemyApiUrl(networkType, apiKeys[networkType]);

    try {
        const body = createRequestBody(networkType, walletAddress);
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.error) {
            throw new Error(data.error.message);
        }

        const balance = extractBalance(networkType, data);

        return { statusCode: 200, headers, body: JSON.stringify({ balance }) };
    } catch (error) {
        console.error("Error fetching balance:", error);
        return { statusCode: 500, headers, body: JSON.stringify({ error: error.message }) };
    }
};

function getAlchemyApiUrl(networkType, apiKey) {
    const baseUrls = {
        Ethereum: `https://eth-mainnet.alchemyapi.io/v2/${apiKey}`,
        Polygon: `https://polygon-mainnet.g.alchemy.com/v2/${apiKey}`,
        Optimism: `https://opt-mainnet.g.alchemy.com/v2/${apiKey}`,
        Arbitrum: `https://arb-mainnet.g.alchemy.com/v2/${apiKey}`,
        Solana: `https://solana-mainnet.g.alchemy.com/v2/${apiKey}`,
        Base: `https://base-mainnet.g.alchemy.com/v2/${apiKey}`,
    };
    return baseUrls[networkType] || throw new Error(`Unsupported network type: ${networkType}`);
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
        // For EVM compatible chains
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
        return (data.result.value / 1e9).toFixed(4); // Convert lamports to SOL
    } else {
        // Assuming data.result is the balance in Wei for EVM chains
        return Web3.utils.fromWei(data.result, 'ether');
    }
}
