import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useEffect } from "react";
import L from "leaflet";
import { useStationsStore } from "../store/useStationsStore";
import { useThemeStore } from "../store/useThemeStore";
import "leaflet/dist/leaflet.css";

// Fix for default Leaflet marker icon in React
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerRetina from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { renderToStaticMarkup } from "react-dom/server";
import { TrainFront } from "lucide-react";

const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerRetina,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function ResizeMap() {
  const map = useMap();
  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize();
    }, 0);
  }, [map]);
  return null;
}

const createCustomIcon = () => {
  const iconHTML = renderToStaticMarkup(
    <div className="relative flex items-center justify-center">
      {/* Outer Pulse effect */}
      <div className="absolute h-8 w-8 bg-indigo-500/30 rounded-full animate-ping" />

      {/* Main Marker Body */}
      <div className="relative bg-indigo-600 dark:bg-indigo-500 p-1.5 rounded-full border-2 border-white dark:border-slate-900 shadow-lg text-white">
        <TrainFront size={14} strokeWidth={2.5} />
      </div>

      {/* Bottom Tip (Optional) */}
      <div className="absolute -bottom-1 w-2 h-2 bg-indigo-600 dark:bg-indigo-500 rotate-45 border-r border-b border-white dark:border-slate-900" />
    </div>,
  );

  return L.divIcon({
    html: iconHTML,
    className: "custom-leaflet-icon", // Removes default white box background
    iconSize: [32, 32],
    iconAnchor: [16, 32], // Points the bottom tip to the coordinate
    popupAnchor: [0, -32],
  });
};

L.Marker.prototype.options.icon = DefaultIcon;

function MapController() {
  const selected = useStationsStore((s) => s.selected);
  const map = useMap();

  useEffect(() => {
    if (selected) {
      map.flyTo([selected.latitude, selected.longitude], 13, {
        animate: true,
        duration: 1.5, // Smooth flight
      });
    }
  }, [selected, map]);

  return null;
}

export default function MapView() {
  const stations = useStationsStore((s) => s.filtered);
  const customIcon = createCustomIcon();
  const dark = useThemeStore((s) => s.dark);

  // Modern Tiles - Much cleaner than default OSM
  const lightTiles = "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png";
  const darkTiles = "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";

  const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';

  return (
    <MapContainer center={[51.1657, 10.4515]} zoom={6} scrollWheelZoom={true} className="h-full w-full outline-none z-0">
      <ResizeMap />
      <TileLayer attribution={attribution} url={dark ? darkTiles : lightTiles} />

      <MapController />

      {stations.map((s) => (
        <Marker key={s.id} position={[s.latitude, s.longitude]} icon={customIcon}>
          <Popup>
            <div className="p-1">
              <h3 className="font-bold text-sm text-gray-900">{s.name}</h3>
              <p className="text-xs text-gray-500 m-0">{s.city}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
