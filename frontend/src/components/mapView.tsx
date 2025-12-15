
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import L from "leaflet";
import type { WeatherData } from "../services/weather.service";
import "leaflet/dist/leaflet.css";



  let latitude: number;
  let longitude: number;

const markerIcon = new L.Icon({
iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
iconSize: [25, 41],
iconAnchor: [12, 41],
popupAnchor: [1, -34],
shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
shadowSize: [41, 41],
});


function ClickHandler({ onSelect }: { onSelect: (lat: number, lon: number) => void }) {
useMapEvents({
    click(e) {onSelect(e.latlng.lat, e.latlng.lng);
      latitude = e.latlng.lat;
      longitude = e.latlng.lng;
    }});
    
    return null;
}


export default function MapView({
  onSelect,
  weather
}: {
  onSelect: (lat: number, lon: number) => void;
  weather: WeatherData | null;

}) {
  const center: [number, number] = weather
    ? [weather.latitude, weather.longitude]
    : [51.505, -0.09];
  return (
    <MapContainer center={center} zoom={6} style={{ height: "100%", minHeight: 500, width: "500px"}}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ClickHandler onSelect={onSelect} />

      {weather && (
        <Marker position={[latitude, longitude]} icon={markerIcon}>
          <Popup>
            <div>
              <strong>Temp: {weather.current_weather.temperature}°C</strong>
              <div>Wind: {weather.current_weather.windspeed} m/s</div>
            </div>
          </Popup>
        </Marker>
      )}
    </MapContainer>
  );
}