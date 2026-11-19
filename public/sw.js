// No-op service worker to prevent 404 logs from previous localhost registrations
self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", () => {
  self.registration.unregister();
});
