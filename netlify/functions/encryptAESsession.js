
const corsHeaders = {
    "Access-Control-Allow-Origin": "*", 
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Content-Type": "application/json"
  };
  
  exports.handler = async (event) => {

    if (event.httpMethod === "OPTIONS") {
      return {
        statusCode: 204,
        headers: corsHeaders,
        body: JSON.stringify({message: "session Connection Established"})
      };
    }
  
    try {

      const ip = event.headers['x-nf-client-connection-ip'] || event.headers['client-ip'];
  
      if (!ip) {

        return {
          statusCode: 400,
          headers: corsHeaders,
          body: JSON.stringify({ error: "Session Error #xf094" })
        };
      }
  

      return {
        statusCode: 200,
        headers: corsHeaders,
        body: JSON.stringify({ ip })
      };
    } catch (error) {

      return {
        statusCode: 500,
        headers: corsHeaders,
        body: JSON.stringify({ error: "ASession Error #xf095" })
      };
    }
  };
  