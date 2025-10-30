import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const GoogleMap = ({ coordinates, zoom = 15, markers = [] }) => {
  const position = [coordinates.lat, coordinates.lng];

  return (
    <MapContainer
      center={position}
      zoom={zoom}
      className="w-full h-full rounded-lg"
      style={{ minHeight: '400px', zIndex: 0 }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {/* Main property marker */}
      <Marker position={position}>
        <Popup>
          <strong>Property Location</strong>
        </Popup>
      </Marker>

      {/* Additional markers if provided */}
      {markers.map((marker, index) => (
        <Marker key={index} position={[marker.position.lat, marker.position.lng]}>
          <Popup>{marker.title}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default GoogleMap;
