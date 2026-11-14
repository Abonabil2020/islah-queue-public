self.addEventListener("push", event => {
  if (!event.data) return;
  const {title, body, tag, room, expiresAt} = event.data.json();
  if (Date.now() >= expiresAt) return;
  event.waitUntil(self.registration.showNotification(title, {
    body, tag, dir: "rtl", lang: "ar", data: {room}, icon: "./icon-192.png"
  }));
});

self.addEventListener("notificationclick", event => {
  event.notification.close();
  const page = new URL("./", self.registration.scope);
  page.searchParams.set("room", event.notification.data.room);
  event.waitUntil(clients.openWindow(page.href));
});
