import { Server, Socket } from "socket.io";

const peerHandler = (io: Server, socket: Socket) => {
  interface sendPeerInterface {
    userToSignal: string;
    signal: string;
    callerID: string;
  }
  interface returnPeerInterface {
    signal: string;
    callerID: string;
  }

  const sendPeer = (payload: sendPeerInterface) => {
    io.to(payload.userToSignal).emit("user joined", {
      signal: payload.signal,
      callerID: payload.callerID,
    });
  };

  const returnPeer = (payload: returnPeerInterface) => {
    io.to(payload.callerID).emit("receiving returned signal", {
      signal: payload.signal,
      id: socket.id,
    });
  };  
  
  const removePeer = () => {
    io.to(socket.data.currentRoom).emit("peer:offline", socket.id);
  }
  
  const stopVideoPeer = () => {
    io.to(socket.data.currentRoom).emit("peer:stop:video", socket.id);
  }
  const startVideoPeer = () => {
    io.to(socket.data.currentRoom).emit("peer:start:video", socket.id);
  }
  const muteAudioPeer = () => {
    io.to(socket.data.currentRoom).emit("peer:mute:audio", socket.id);
  }
  const unMuteAudioPeer = () => {
    io.to(socket.data.currentRoom).emit("peer:unmute:audio", socket.id);
  }

  socket.on("peer:send", sendPeer);
  socket.on("peer:return", returnPeer);
  socket.on("peer:remove", removePeer);
  socket.on("peer:video:stop", stopVideoPeer);
  socket.on("peer:video:start", startVideoPeer);
  socket.on("peer:audio:mute", muteAudioPeer);
  socket.on("peer:audio:unmute", unMuteAudioPeer);
};

export default peerHandler;
