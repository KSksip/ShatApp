import { defineWebSocketHandler } from "h3";

export default defineWebSocketHandler({

  open(peer) {
    peer.send('wee')
/*     console.log("[ws] open", peer);
 */    peer.subscribe('main')
  },

  message(peer, message) {
    console.log("[ws] message", message);
    peer.publish('main', message)
    /* if (message.text().includes("ping")) {
      peer.send("pong");
    } */
  },

  close(peer, event) {
    console.log("[ws] close", peer, event);
  },

  error(peer, error) {
    console.log("[ws] error", peer, error);
  },
});
