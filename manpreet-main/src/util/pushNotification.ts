// src/util/pushNotification.ts

const VAPID_PUBLIC_KEY = "BABOTjOsoKtKMfhr8Tp20j_1myoso-L7wrg9Styr6BXpsMLLARVJgx48isYS-Y35-PyvM0p7ELYqE8pUNLeVWGE";

function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export const subscribeToPush = async (apiUrl: string) => {
  if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
    return { success: false, message: "Browser support नहीं है" };
  }

  try {
    const registration = await navigator.serviceWorker.register(
      "/service-worker.js"
    );

    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      return { success: false, message: "Permission deny कर दी" };
    }

    let subscription = await registration.pushManager.getSubscription();

    if (!subscription) {
      subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
      });
    }

    const device = /Mobile|Android|iPhone/i.test(navigator.userAgent)
      ? "mobile"
      : "desktop";

    const response = await fetch(`${apiUrl}/api/notifications/subscribe`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify({
        subscription,
        device,
        userAgent: navigator.userAgent,
      }),
    });

    const data = await response.json();

    if (data.success) {
      localStorage.setItem("pushEnabled", "true");
      return { success: true, message: "🎉 Notifications चालू!" };
    }

    return { success: false, message: "Save नहीं हो पाया" };
  } catch (error: any) {
    console.error("Subscribe error:", error);
    return { success: false, message: error.message };
  }
};

export const unsubscribeFromPush = async (apiUrl: string) => {
  if (!("serviceWorker" in navigator)) return;
  const registration = await navigator.serviceWorker.ready;
  const subscription = await registration.pushManager.getSubscription();

  if (subscription) {
    await fetch(`${apiUrl}/api/notifications/unsubscribe`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify({ endpoint: subscription.endpoint }),
    });

    await subscription.unsubscribe();
    localStorage.removeItem("pushEnabled");
  }
};

export const isPushEnabled = (): boolean => {
  return localStorage.getItem("pushEnabled") === "true";
};