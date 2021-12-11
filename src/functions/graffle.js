const signalR = require("@microsoft/signalr");
const axios = require("axios");

export default function GraffleSDK() {

  let negotiateResult;
  const projectID = process.env.REACT_APP_GRAFFLE_PROJECT_ID
  const negotiate = async () => {

    const authHeader = {
        "graffle-api-key": process.env.REACT_APP_GRAFFLE_API_KEY
    }
    const url = process.env.REACT_APP_GRAFFLE_API_URL

    negotiateResult = await axios.post(url, {}, { headers: authHeader });
  };

  this.stream = async (streamCallback) => {
    await negotiate();
    const connection = new signalR.HubConnectionBuilder()
      .withUrl(negotiateResult.data.url, {
        accessTokenFactory: () => negotiateResult.data.accessToken,
      })
      .withAutomaticReconnect()
      .build();

    if (connection) {
      connection.start()
      .then((result) => {
          //console.log("1st Parse: "+projectID)
        connection.on(projectID, (message) => {
          var parsedMessage = JSON.parse(message);
          //console.log("Parsing Message for: "+projectID)
          streamCallback(parsedMessage);
        });
      });
    }
    return connection;
  };
}