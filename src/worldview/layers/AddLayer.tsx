import React,{ useEffect } from "react";
import AddWMTSLayer from './AddWMTSLayer';


const AddLayer = ({layer, map}) => {

    useEffect(() => {
        if (!map) return;
    })

    return (
        <>
            <AddWMTSLayer layer={layer} map={map} />
        </>
    );
}

export default AddLayer;