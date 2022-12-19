import React,{ useEffect, useContext } from "react";
import AddWMTSLayer from './AddWMTSLayer';
import MapContext from '../mapLayout/MapContext';


const AddLayer = ({layer}) => {

    const { map } = useContext(MapContext);

    useEffect(() => {
        if (!map) return;
    })

    return (
        <>
            <AddWMTSLayer layer={layer} />
        </>
    );
}

export default AddLayer;