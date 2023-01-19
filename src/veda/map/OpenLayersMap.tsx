import { useRef, useEffect, useContext } from "react";
import OlMap from "ol/Map";
import OlView from "ol/View";
import * as olProj from "ol/proj";
import "./Map.css";
import config from "../config/config";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import AddLayer from "../layers/AddLayer";
import MapContext from "../mapLayout/MapContext";
import OpenLayersHLSLayers from "../layers/OpenLayersHLSLayers";
import MapEvents from "../layers/OpenLayersMapEventListeners";

const Map = () => {
  const mapRef = useRef();
  const availableLayers = useAppSelector(
    (state) => state.worldview.availableLayers
  );

  const { map, setMap, setLayerData } = useContext(MapContext);

  const projection = config.projections.geographic;

  // componentDidMount
  useEffect(() => {
    const geoProjection = olProj.get(projection.crs);

    const view = new OlView({
      maxResolution: projection.resolutions[0],
      projection: geoProjection,
      // center: projection.startCenter,
      center: [-72.71, 41.56],
      // zoom: projection.startZoom,
      zoom: 8,
      maxZoom: projection.numZoomLevels,
      extent: projection.maxExtent,
      // extent: [-73.7, 41.6, -71.8, 42.05],
      constrainOnlyCenter: true,
    });
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

    return () => mapObj.setTarget(undefined);
  }, []);

  // get all of the current layers from the openlayers map object and set to state
  useEffect(() => {
    if (!map) return;
    const currentLayers = map.getLayers();
    const layersArray = currentLayers.array_;
    setLayerData(layersArray);
  }, [map]);

  return (
    <>
      <div ref={mapRef} className="ol-map">
        {availableLayers &&
          availableLayers.map((layer) => {
            if (layer.active)
              return <AddLayer layer={layer.data} key={layer.name} />;
          })}
        <OpenLayersHLSLayers />
        <MapEvents />
      </div>
    </>
  );
};

export default Map;
