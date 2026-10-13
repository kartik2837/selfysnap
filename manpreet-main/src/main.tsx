// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.tsx'
// import { BrowserRouter } from 'react-router-dom'
// import { Provider } from 'react-redux'
// import store from './Redux Toolkit/Store.ts'

// createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//     <BrowserRouter>
//       <Provider store={store}>
//         <App />
//       </Provider>
//     </BrowserRouter>
//   </StrictMode>,
// )













// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.tsx'
// import { BrowserRouter } from 'react-router-dom'
// import { Provider } from 'react-redux'
// import store from './Redux Toolkit/Store.ts'

// // 🔥 Socket imports
// import { initCustomerSocket } from './customer/services/socketService.ts'

// // 🔥 Customer ID और JWT check करो
// const customerId = localStorage.getItem('customerId')
// const jwt = localStorage.getItem('jwt')

// console.log('🔌 [MAIN] customerId:', customerId)
// console.log('🔌 [MAIN] jwt:', jwt ? 'exists' : 'missing')

// // 🔥 Socket initialize करो (अगर logged in है)
// if (customerId && jwt) {
//   console.log('🔌 [MAIN] Initializing customer socket...')
//   initCustomerSocket(customerId)
// } else {
//   console.log('⚠️ [MAIN] Skipping socket - no customerId or jwt')
// }

// createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//     <BrowserRouter>
//       <Provider store={store}>
//         <App />
//       </Provider>
//     </BrowserRouter>
//   </StrictMode>,
// )




















// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import "./index.css";
// import App from "./App.tsx";
// import { BrowserRouter } from "react-router-dom";
// import { Provider } from "react-redux";
// import store from "./Redux Toolkit/Store.ts";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// /* ═══════════════════════════════════════════════
//    🔥 REACT QUERY CONFIG — Caching + Performance
//    ═══════════════════════════════════════════════ */
// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       staleTime: 5 * 60 * 1000,        // 5 min tak fresh (no refetch)
//       gcTime: 30 * 60 * 1000,          // 30 min memory cache
//       refetchOnWindowFocus: false,     // Tab switch pe refetch NA karo
//       refetchOnMount: false,           // Component mount pe refetch NA karo
//       refetchOnReconnect: false,       // Internet wapas aane pe NA karo
//       retry: 1,                        // 1 baar retry
//       retryDelay: 1000,                // 1 sec baad retry
//     },
//     mutations: {
//       retry: 1,
//     },
//   },
// });

// /* ═══════════════════════════════════════════════
//    🔥 RENDER — Sabse pehle UI dikhao
//    ═══════════════════════════════════════════════ */
// createRoot(document.getElementById("root")!).render(
//   <StrictMode>
//     <QueryClientProvider client={queryClient}>
//       <BrowserRouter>
//         <Provider store={store}>
//           <App />
//         </Provider>
//       </BrowserRouter>
//     </QueryClientProvider>
//   </StrictMode>
// );

// /* ═══════════════════════════════════════════════
//    🔥 SOCKET — Render ke BAAD, browser idle pe
//    ═══════════════════════════════════════════════ */
// const customerId = localStorage.getItem("customerId");
// const jwt = localStorage.getItem("jwt");

// if (customerId && jwt) {
//   const initSocket = () => {
//     import("./customer/services/socketService.ts")
//       .then(({ initCustomerSocket }) => {
//         initCustomerSocket(customerId);
//       })
//       .catch((err) => console.warn("Socket init failed:", err));
//   };

//   // Browser idle hone pe socket init karo
//   if ("requestIdleCallback" in window) {
//     (window as any).requestIdleCallback(initSocket, { timeout: 3000 });
//   } else {
//     setTimeout(initSocket, 2000);
//   }
// }











import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Redux Toolkit/Store.ts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

/* ═══════════════════════════════════════════════
   🔥 SUPPRESS MUI ARIA-HIDDEN WARNING (Dev Only)
   ═══════════════════════════════════════════════ */
if (import.meta.env.DEV) {
  const originalError = console.error;
  console.error = (...args: any[]) => {
    if (
      typeof args[0] === "string" &&
      (args[0].includes("Blocked aria-hidden") ||
        args[0].includes("aria-hidden on an element") ||
        args[0].includes("The focus must not be hidden"))
    ) {
      return; // 🔥 Ignore — MUI Modal warning
    }
    originalError.apply(console, args);
  };

  const originalWarn = console.warn;
  console.warn = (...args: any[]) => {
    if (
      typeof args[0] === "string" &&
      (args[0].includes("Blocked aria-hidden") ||
        args[0].includes("aria-hidden on an element"))
    ) {
      return;
    }
    originalWarn.apply(console, args);
  };
}

/* ═══════════════════════════════════════════════
   🔥 REACT QUERY CONFIG — Caching + Performance
   ═══════════════════════════════════════════════ */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,        // 5 min tak fresh (no refetch)
      gcTime: 30 * 60 * 1000,          // 30 min memory cache
      refetchOnWindowFocus: false,     // Tab switch pe refetch NA karo
      refetchOnMount: false,           // Component mount pe refetch NA karo
      refetchOnReconnect: false,       // Internet wapas aane pe NA karo
      retry: 1,                        // 1 baar retry
      retryDelay: 1000,                // 1 sec baad retry
    },
    mutations: {
      retry: 1,
    },
  },
});

/* ═══════════════════════════════════════════════
   🔥 RENDER — Sabse pehle UI dikhao
   ═══════════════════════════════════════════════ */
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);

/* ═══════════════════════════════════════════════
   🔥 SOCKET — Render ke BAAD, browser idle pe
   ═══════════════════════════════════════════════ */
const customerId = localStorage.getItem("customerId");
const jwt = localStorage.getItem("jwt");

if (customerId && jwt) {
  const initSocket = () => {
    import("./customer/services/socketService.ts")
      .then(({ initCustomerSocket }) => {
        initCustomerSocket(customerId);
      })
      .catch((err) => console.warn("Socket init failed:", err));
  };

  // Browser idle hone pe socket init karo
  if ("requestIdleCallback" in window) {
    (window as any).requestIdleCallback(initSocket, { timeout: 3000 });
  } else {
    setTimeout(initSocket, 2000);
  }
}