import { config } from "@onflow/fcl"
import {send as grpcSend} from "@onflow/transport-grpc"
//import {send as httpSend} from "@onflow/transport-http"

config()
  .put("accessNode.api", process.env.REACT_APP_ACCESS_NODE) // Configure FCL's Access Node
  //.put("challenge.handshake", process.env.REACT_APP_WALLET_DISCOVERY) // Configure FCL's Wallet Discovery mechanism
  .put("discovery.wallet", process.env.REACT_APP_WALLET_DISCOVERY)
  .put("app.detail.title", ".find")
  .put("app.detail.icon", "https://find.xyz/find.png")
  .put("env", process.env.REACT_APP_NETWORK)
  .put("sdk.transport", grpcSend)
  .put("decoder.Enum", (val) => {
    const result = {
      type: val.id
    };

    for (let i = 0; i < val.fields.length; i++) {
      const field = val.fields[i];
      result[field.name] = field.value;
    }

    return result;
  });

/*
fclConfig
  .put("accessNode.api", process.env.ACCESS_NODE) // Configure FCL's Access Node
  .put("challenge.handshake", process.env.WALLET_DISCOVERY) // Configure FCL's Wallet Discovery mechanism
  .put("discovery.wallet","http://localhost:3000/fcl/authn")
  */

