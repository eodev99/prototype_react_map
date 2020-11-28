import React, { Component, useState, useEffect } from "react";
import areas from "../data/wards.json";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../styles/map.css";
import styled from "styled-components";
import { render } from "@testing-library/react";
import areaGroup from "../entities/AreaGroup";
import { GroupsProvider, GroupsContext } from "../context/GroupsState";
import AreaGroup from "../entities/AreaGroup";

const StyledMapPanel = styled.div`
  width: 100%;
`;

//all of this needs to be refactored out of the component

class MapPanel extends Component {
  state = { selectedCountries: [], styles: [], groups: [] };

  componentDidMount() {}

  addArea = (name) => {
    var newCountries = this.state.selectedCountries.includes(name)
      ? this.state.selectedCountries
      : [...this.state.selectedCountries, name];
    this.setState({
      selectedCountries: newCountries,
    });
  };

  removeArea = (name) => {
    var newCountries = this.state.selectedCountries.includes(name)
      ? this.state.selectedCountries.filter((item) => item !== name)
      : this.state.selectedCountries;
    this.setState({
      selectedCountries: newCountries,
    });
  };

  removeAllAreas = () => {
    this.setState({ selectedCountries: [] });
  };

  giveColor = (areaName) => {
    //if area is in group apply group color else apply default
    const defaultColor = "blue";
    const selectedColor = "red";
    var color = defaultColor;

    const groups = this.state.groups;

    if (this.state.groups.length > 0) {
      groups.map((group) => {
        if (group.getAreas().includes(areaName)) {
          color = group.color;
        }
      });
    }

    //if area is selected apply selected color
    if (this.state.selectedCountries.length > 0) {
      color = this.state.selectedCountries.includes(areaName)
        ? selectedColor
        : color;
    }

    return color;
  };

  onEachArea = (feature, layer) => {
    let areaName = feature.properties.WD13NM;
    var self = this;
    layer.bindPopup(areaName);

    layer.on({
      click: () => self.addArea(areaName),
      contextmenu: () => self.removeArea(areaName),
    });
  };

  style = (feature) => {
    const {
      properties: { WD13NM },
    } = feature;

    return {
      fillColor: this.giveColor(feature.properties.WD13NM),
      weight: 0.3,
      opacity: 1,
      color: "white",
      fillOpacity: 0.5,
    };
  };

  createGroup = () => {
    //get current grouping from state
    const groups = this.state.selectedCountries;
    // create new areagroup with current grouping as groups and assign random color and id
    const areaGroup = new AreaGroup(
      //assign a random ID
      Math.floor(Math.random() * 10000),
      //create random colour
      "#" + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6),
      groups
    );
    //add new group to state
    this.setState({ groups: [...this.state.groups, areaGroup] });
    //deselect current grouping
    this.removeAllAreas();
  };

  // when group id is clicked form list
  clickGroup = (e) => {
    const groupId = e.target.value;
    //get group
    const group = this.state.groups.find((g) => g.uid == groupId);
    if (group) {
      //unselect selelction
      this.removeAllAreas();
      //set selection to current group
      this.setState({ selectedCountries: group.getAreas() });
    }
  };

  render() {
    return (
      <StyledMapPanel>
        <h1 style={{ background: "#005599" }} onClick={this.createGroup}>
          Map
        </h1>
        <ul>
          {this.state.groups.map((group) => {
            return (
              <li value={group.uid} onClick={this.clickGroup}>
                {group.uid}
              </li>
            );
          })}
        </ul>
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
            key={this.state.selectedCountries}
            style={this.style}
            data={areas.features}
            onEachFeature={this.onEachArea}
          />
        </MapContainer>
      </StyledMapPanel>
    );
  }
}

export default MapPanel;
