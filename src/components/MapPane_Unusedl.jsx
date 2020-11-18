import React, { useState, useEffect } from "react";
import areas from "../data/wards.json";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../styles/map.css";
import styled from "styled-components";

const StyledMapPanel = styled.div`
  width: 100%;
`;

const MapPanel = () => {
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [styles, setStyles] = useState([]);

  useEffect(() => {
    // every selected country should be set to green

  }, [selectedCountries]);

  const addArea = (name) => {
    setSelectedCountries((prevSelectedCountries) => {
      if (!prevSelectedCountries.includes(name)) {
        //new to selection
        return [...prevSelectedCountries, name];
      } else {
        // already selecetd area so return previous
        return prevSelectedCountries;
      }
    });
  };

//   const giveColor = (areaName) => {
//     if (selectedCountries.includes(areaName)) {
//       return "red";
//     } else {
//       return "black";
//     }
//   };
    const giveColor = (areaName) => {
        if(Math.random() > 0.5){
            return "blue"
        }else{
            return "green"
        }
    }

  const onEachArea = (feature, layer) => {
    let areaName = feature.properties.WD13NM;

    layer.on("click", function (e) {
      addArea(areaName);
      e.target.setStyle({fillColor : giveColor(feature.properties.WD13NM)})
      layer.options.fillColor = "red"
    });
    layer.options.fillOpacity = Math.random();
  };


  const style = (feature) => {
    const {
      properties: { WD13NM },
    } = feature;
    return {
      fillColor: giveColor(WD13NM),
      weight: 0.3,
      opacity: 1,
      color: "black",
      dashArray: "3",
      fillOpacity: 0.5,
    };
  };

  const renderAreas = () => {
    return areas.map((area) => {
      let areaName = area.WD13NM;
      let style = selectedCountries.includes(areaName)
        ? { fillColor: "red" }
        : { fillColor: "blue" };
    });
  };

  return (
    <StyledMapPanel>
      <h1>Map</h1>
      <MapContainer
        class="map-container"
        style={{ height: "80vh" }}
        zoom={12}
        center={[52.6369, -1.1398]}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <GeoJSON
          style={style}
          data={areas.features}
          onEachFeature={onEachArea}
        />
      </MapContainer>
    </StyledMapPanel>
  );
};

export default MapPanel;
