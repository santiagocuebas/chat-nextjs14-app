import { io } from "socket.io-client";

export const socket = io(process.env.NEXT_PUBLIC_DIR ?? '', {
  autoConnect: false,
  reconnectionDelay: 10000,
  reconnectionDelayMax: 10000,
  transports: ['polling', 'websocket']
});
