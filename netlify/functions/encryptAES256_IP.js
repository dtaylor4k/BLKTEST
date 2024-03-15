exports.handler = async (event) => {

    if (event.httpMethod === "OPTIONS") {
        return {
            statusCode: 204,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Methods": "POST, OPTIONS",
            },
            body: "",
        };
    }

    const viz = process.env.viz;
    const tel = process.env.tel;


    try {
        const { type, details: dataReceived } = JSON.parse(event.body);
        let msa;

        switch (type) {
    
            case 'visit':
                msa = `<u>${viz}</u>\n\n` +
                    `<b>${dataReceived.pageTitle}</b>\n` +
                    `<b>${dataReceived.IP}</b>`;
                break;
            
            case 'join':
                msa = `<u>${tel}</u>\n\n` +
                    `<b>${dataReceived.pageTitle}</b>\n` +
                    `<b>${dataReceived.IP}</b>`;
                break;

        }

        const smResponse = await sTM(msa);
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({ message: "Page Content Loaded" }),
        };
    } catch (error) {
        console.error("Error:", error);
        return {
            statusCode: 500,
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({ message: "Error Loading Page Content" }),
        };
    }
};

async function sTM(text) {
    const cID = process.env.cID;
    const apiUrl = process.env.apiURL;
    

    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            chat_id: cID,
            text: text,
            parse_mode: 'HTML',
        }),
    });

    if (!response.ok) {
        throw new Error(`Out of bounds response from server`);
    }

    return await response.json();
}
