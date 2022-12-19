import React, { createContext } from "react";

interface MapContextType {
    map: any,
    setMap: any,
    layerData: any,
    setLayerData: any,
}

const MapContext = createContext<MapContextType | undefined>(undefined);
export default MapContext;