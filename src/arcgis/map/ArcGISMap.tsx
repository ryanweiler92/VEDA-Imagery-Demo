import React, {useEffect, useState} from 'react'
import { Container, Flex, FlexProps, Box, Button } from '@chakra-ui/react'
import ArcGISMap from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import esriConfig from "@arcgis/core/config";

const ESRI_KEY = process.env.REACT_APP_ARC_GIS_KEY
esriConfig.apiKey = ESRI_KEY

const ESRIMap = () => {

  // const map = new ArcGISMap({
  //   basemap: "arcgis-topographic"
  // });
  
  // const view = new MapView({
  //   map: map,
  //   container: "viewDiv",
  //   center: [-118.244, 34.052],
  //   zoom: 12
  // });

  return (
    <>
      <div id="viewDiv" >

      </div>
    </>
  )
}

export default ESRIMap