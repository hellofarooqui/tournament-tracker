// src/components/PushNotifications.jsx
import { useState, useEffect } from "react";

const PushNotifications = () => {
  const [isSupported, setIsSupported] = useState(false);
  const [subscription, setSubscription] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setIsSupported("serviceWorker" in navigator && "PushManager" in window);
  }, []);

  const urlBase64ToUint8Array = (base64String) => {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, "+")
      .replace(/_/g, "/");

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  };

  const subscribeToPush = async () => {
    try {
      const registration = await navigator.serviceWorker.ready;
      const sub = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(
          import.meta.env.VITE_VAPID_PUBLIC_KEY
        ),
      });

      setSubscription(sub);

      // Send subscription to backend
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/subscribe`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(sub),
        }
      );

      if (response.ok) {
        setMessage("Successfully subscribed to push notifications!");
      }
    } catch (error) {
      console.error("Error subscribing to push notifications:", error);
      setMessage("Failed to subscribe to push notifications.");
    }
  };

  const requestPermission = async () => {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      await subscribeToPush();
    } else {
      setMessage("Permission denied for notifications.");
    }
  };

  const sendTestNotification = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/send-notification`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: "Test Notification",
            body: "This is a test from your Vite PWA!",
            icon: "/pwa-192x192.png",
          }),
        }
      );

      if (response.ok) {
        setMessage("Test notification sent!");
      }
    } catch (error) {
      console.error("Error sending notification:", error);
      setMessage("Failed to send test notification.");
    }
  };

  if (!isSupported) {
    return <div>Push notifications are not supported in this browser.</div>;
  }

  return (
    <div className="push-notifications">
      <h3>Push Notifications</h3>
      {!subscription ? (
        <button onClick={requestPermission}>Enable Push Notifications</button>
      ) : (
        <div>
          <p>✅ Push notifications are enabled!</p>
          <button onClick={sendTestNotification}>Send Test Notification</button>
        </div>
      )}
      {message && <p>{message}</p>}
    </div>
  );
};

export default PushNotifications;
