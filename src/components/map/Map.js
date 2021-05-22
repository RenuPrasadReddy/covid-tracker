// import React from "react";
// import { MapContainer as LeafletMap, TileLayer } from "react-leaflet";

// function Map() {
//   return (
//     <div className="map">
//       <LeafletMap>
//         <TileLayer
//            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         />
//       </LeafletMap>
//     </div>
//   );
// }

// export default Map;


import React from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "./map.css";
import { showDataOnMap } from "../../util"; 

function Map({ countries, casesType, center, zoom }) {

console.log({countries, casesType, center, zoom});
  function ChangeView({ center, zoom }) {
    const map = useMap();
    map.setView(center, zoom);
    return null;
  }

  return (
    <MapContainer
      casesType={casesType}
      className="map"
      center={center}
      zoom={zoom}
      scrollWheelZoom={false}
    >
      <ChangeView center={center} zoom={zoom} />
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {showDataOnMap(countries, casesType)}
    </MapContainer>
  );
}

export default Map;
