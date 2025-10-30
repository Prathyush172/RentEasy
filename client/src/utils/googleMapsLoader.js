// Utility to load Google Maps API
let isLoaded = false;
let isLoading = false;
const callbacks = [];

export const loadGoogleMapsAPI = (apiKey) => {
  return new Promise((resolve, reject) => {
    // Already loaded
    if (isLoaded) {
      resolve(window.google);
      return;
    }

    // Currently loading, add to callbacks
    if (isLoading) {
      callbacks.push({ resolve, reject });
      return;
    }

    isLoading = true;

    // Create script element
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      isLoaded = true;
      isLoading = false;
      resolve(window.google);
      callbacks.forEach(cb => cb.resolve(window.google));
      callbacks.length = 0;
    };

    script.onerror = (error) => {
      isLoading = false;
      reject(error);
      callbacks.forEach(cb => cb.reject(error));
      callbacks.length = 0;
    };

    document.head.appendChild(script);
  });
};

// Initialize when the app loads
if (import.meta.env.VITE_GOOGLE_MAPS_API_KEY) {
  loadGoogleMapsAPI(import.meta.env.VITE_GOOGLE_MAPS_API_KEY)
    .then(() => console.log('Google Maps API loaded'))
    .catch(err => console.error('Failed to load Google Maps API:', err));
}
