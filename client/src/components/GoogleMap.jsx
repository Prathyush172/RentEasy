import React, { useEffect, useRef } from 'react';

const GoogleMap = ({ coordinates, zoom = 15, markers = [] }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    if (!window.google) {
      console.error('Google Maps API not loaded');
      return;
    }

    if (mapRef.current && !mapInstanceRef.current) {
      // Initialize map
      mapInstanceRef.current = new window.google.maps.Map(mapRef.current, {
        center: coordinates,
        zoom: zoom,
        mapTypeControl: true,
        streetViewControl: true,
        fullscreenControl: true,
      });

      // Add main marker
      new window.google.maps.Marker({
        position: coordinates,
        map: mapInstanceRef.current,
        title: 'Property Location',
        animation: window.google.maps.Animation.DROP,
      });

      // Add additional markers if provided
      markers.forEach((marker) => {
        new window.google.maps.Marker({
          position: marker.position,
          map: mapInstanceRef.current,
          title: marker.title,
          icon: marker.icon,
        });
      });
    }
  }, [coordinates, zoom, markers]);

  return (
    <div 
      ref={mapRef} 
      className="w-full h-full rounded-lg"
      style={{ minHeight: '400px' }}
    />
  );
};

export default GoogleMap;
