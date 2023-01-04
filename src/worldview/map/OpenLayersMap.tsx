import React, { useRef, useState, useEffect, useContext } from "react"
import { Box, Badge, Switch, Button, Flex, Heading, List, ListItem, Text, Icon, Spacer } from "@chakra-ui/react";
import OlMap from "ol/Map";
import OlView from "ol/View";
import * as olProj from "ol/proj";
import "./Map.css";
import config from '../config/config';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import AddLayer from '../layers/AddLayer';
import MapContext from '../mapLayout/MapContext';
import OpenLayersHLSLayers from '../layers/OpenLayersHLSLayers';

const Map = () => {
  const mapRef = useRef();
  const dispatch = useAppDispatch();
  const availableLayers = useAppSelector((state) => state.worldview.availableLayers);

  const { map, setMap, setLayerData} = useContext(MapContext);

  const projection = config.projections.geographic;

  // componentDidMount
  useEffect(() => {
    const geoProjection = olProj.get(projection.crs)

    const view = new OlView({
        maxResolution: projection.resolutions[0],
        projection: geoProjection,
        center: projection.startCenter,
        zoom: projection.startZoom,
        maxZoom: projection.numZoomLevels,
        extent: projection.maxExtent,
        constrainOnlyCenter: true
    })
    let options = {
        view: view,
        layers: [],
        controls: [],
        overlays: [],
        renderer: ["canvas"],
    };

    let mapObj = new OlMap(options);
    mapObj.setTarget(mapRef.current);
    setMap(mapObj);

    //componentWillUnmount
    return () => mapObj.setTarget(undefined);
}, []);

  // get all of the current layers from the openlayers map object and set to state
  useEffect(() => {
    if (!map) return;
    const currentLayers = map.getLayers();
    const layersArray = currentLayers.array_
    setLayerData(layersArray);
}, [map]);

  const testFunction = () => {
    console.log(map.getLayers())
  }

  return (
    <>
    {/* <Button colorScheme="red" onClick={testFunction}>Console Map</Button> */}
    <div ref={mapRef} className="ol-map">
      {availableLayers && availableLayers.map((layer) => {
        if (layer.active) return (
          <AddLayer layer={layer.data} key={layer.name} />
        )})}
        <OpenLayersHLSLayers />
    </div>
    </>
  );
}

export default Map