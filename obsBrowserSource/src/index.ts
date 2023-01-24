import { io } from "socket.io-client";
import { playNextVoiceline } from "./queue";
import { VoicelineEmitMessage } from "./types";
import { queueVoiceline } from "./voicelines";

// To be given by express template engine
declare const expressTemplateData: string;

type TemplateData = {
  browserSourceId: string;
  socketIoServerUri: string;
};

let templateData;
try {
  templateData = JSON.parse(expressTemplateData);
} catch (error) {
  if (error instanceof ReferenceError) {
    console.error(
      "ERROR: No templateData was passed to this page from the server."
    );
    // (probably a local dev environment)
    // Use .env provided values instead
    templateData = {
      browserSourceId: import.meta.env.VITE_BROWSER_SOURCE_ID,
      socketIoServerUri: import.meta.env.VITE_SOCKET_SERVER_URI,
    };
  }
  else {
    throw error;
  }
}

console.dir({
  socketIoServerUri: templateData.socketIoServerUri,
  browserSourceId: templateData.browserSourceId,
});

const socket = io(templateData.socketIoServerUri, {
  auth: {
    token: templateData.browserSourceId,
  },
  secure: true,
});

const connectionNotification = document.getElementById(
  "connectionNotification"
);
const disconnectionNotification = document.getElementById(
  "disconnectionNotification"
);
socket.on("connect", () => {
  console.log(`Connected! Client id: ${socket.id}`);
  if (connectionNotification && disconnectionNotification) {
    connectionNotification.classList.add("connected");
    disconnectionNotification.classList.remove("disconnected");
  }
});

socket.on("disconnect", () => {
  console.log(`SocketIO Disconnected`);
  if (connectionNotification && disconnectionNotification) {
    disconnectionNotification.classList.add("disconnected");
    connectionNotification.classList.remove("connected");
  }
});

socket.on("queueVoiceline", (voicelines: VoicelineEmitMessage[]) => {
  console.log("voicelines: ", voicelines);

  // Update queue with voicelines from SocketIo message
  voicelines.forEach((voiceline) => queueVoiceline(voiceline));

  // Play next voiceline in queue
  playNextVoiceline();
});
