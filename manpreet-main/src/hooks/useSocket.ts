// import { useEffect, useRef } from "react";
// import { io, Socket } from "socket.io-client";

// const SOCKET_URL = "http://localhost:8080";

// let globalSocket: Socket | null = null;

// export const getSocket = (): Socket => {
//   if (!globalSocket) {
//     globalSocket = io(SOCKET_URL, {
//       transports: ["websocket"],
//       autoConnect: true,
//       reconnection: true,
//       reconnectionAttempts: 10,
//       reconnectionDelay: 1000,
//     });
//   }
//   return globalSocket;
// };

// export const useSocket = () => {
//   const socketRef = useRef<Socket>(getSocket());

//   useEffect(() => {
//     const socket = socketRef.current;
//     if (!socket.connected) {
//       socket.connect();
//     }
//     return () => {
//       // Keep alive — don't disconnect
//     };
//   }, []);

//   return socketRef.current;
// };
















import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";

// 🔥 API CONFIG IMPORT
import {api} from "../Config/Api";
// ⚠️ Path apne project ke hisaab se adjust karo:
// Agar ye file src/socket/socket.ts me hai → "../config/api"
// Agar src/utils/socket.ts me hai → "../config/api"
// Agar src/hooks/useSocket.ts me hai → "../config/api"

/* ═══════════════════════════════════════════════
   🔥 BUILD SOCKET URL — API CONFIG KE HISAAB SE
   ═══════════════════════════════════════════════ */
const getSocketURL = (): string => {
  // 1. api.ts se baseURL uthao
  let baseURL = "";

  if (api && api.defaults && api.defaults.baseURL) {
    baseURL = api.defaults.baseURL;
  }

  // 2. Safety fallback
  if (!baseURL) {
    console.warn("⚠️ API baseURL not found in config/api.ts");
    // Relative URL — browser khud domain add kar dega
    return window.location.origin;
  }

  // 3. /api suffix hata do (socket root pe chalta hai)
  const rootURL = baseURL.replace(/\/api\/?$/, "").replace(/\/$/, "");

  // 4. Agar relative URL hai (jaise "/api"), toh origin add karo
  if (rootURL.startsWith("/")) {
    return window.location.origin;
  }

  return rootURL;
};

const SOCKET_URL = getSocketURL();

let globalSocket: Socket | null = null;

export const getSocket = (): Socket => {
  if (!globalSocket) {
    globalSocket = io(SOCKET_URL, {
      transports: ["websocket"],
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 1000,
    });
  }
  return globalSocket;
};

export const useSocket = () => {
  const socketRef = useRef<Socket>(getSocket());

  useEffect(() => {
    const socket = socketRef.current;
    if (!socket.connected) {
      socket.connect();
    }
    return () => {
      // Keep alive — don't disconnect
    };
  }, []);

  return socketRef.current;
};