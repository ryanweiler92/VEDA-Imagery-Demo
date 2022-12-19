
# Worldview Map State Variables

## Context
### The following are non-serializable values that we cannot store in the Redux store. We create them with local state and pass through context

* map: Represents the OpenLayers map object 
* layerData: Represents the layers in the OpenLayers map object. We get these using the `getLayers()` OL method.

## Redux
### The following are values that we store in the Redux store. We could probably have created all of these with local state and passed through context but I wanted to simulate a Redux environment like we do in the WV project. 

* availableLayers: This is an array of layers that I have pre-configured to be used in this project. Found in `/worldview/config/availableLayers.ts`. 
* date: The layer date currently being represented on the OL map.