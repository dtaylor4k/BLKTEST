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

    let apiKey;
    let walletAddress;
    let networkType;
    let web3ProviderUrl;

    try {
        // Parse request body
        const requestBody = JSON.parse(event.body);
        walletAddress = requestBody.walletAddress;
        networkType = requestBody.networkType;
        apiKey = process.env.ETH_API_KEY;
        
        if (!apiKey) {
            throw new Error("ETH_API_KEY is not set in environment variables.");
        }

        web3ProviderUrl = getWeb3ProviderUrl(networkType, apiKey);
        const web3 = new Web3(web3ProviderUrl);

        const balance = await web3.eth.getBalance(walletAddress);
        const balanceInEther = Web3.utils.fromWei(balance, 'ether');

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ balance: balanceInEther }),
        };

    } catch (error) {
        console.error("Error occurred:", error.message);

        // Specific error logging can be added here based on the error type
        // For example, log different messages based on whether the error was due to an invalid API key, a Web3 error, or a JSON parsing error

        return {
            statusCode: error.name === 'SyntaxError' ? 400 : 500,
            headers,
            body: JSON.stringify({
                error: `Error fetching balance: ${error.message}`,
                details: {
                    walletAddress,
                    networkType,
                    web3ProviderUrl,
                    apiKeyPresent: !!apiKey,
                },
            }),
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
        default: throw new Error(`Unsupported network type: ${networkType}`);
    }
}
