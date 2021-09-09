import * as esriLoader from 'esri-loader'
export let map = null
export let esriFunction = null

export const createSymbol = (style) => {
    return new esriFunction['PictureMarkerSymbol'](
        style.url,
        style.width,
        style.height
    ).setOffset(
        (style.offset && style.offset.x) || 0,
        (style.offset && style.offset.y) || 0
    )
}

export const addFeature = (feature) => {
    let geometry = new esriFunction[feature.type](feature.geometry)
    geometry.setSpatialReference(map.spatialReference)
    let symbol = createSymbol(feature.style)
    let graphic = new esriFunction['Graphic'](geometry, symbol)
    graphic.setAttributes(feature)
    return graphic
}

export const createMap = (domID) => {
    esriLoader.loadCss(`${gisConfig.serverUrl}/js/esri/css/esri.css`)
    esriLoader
        .loadModules(
            [
                'esri/map',
                'esri/layers/ArcGISTiledMapServiceLayer',
                'esri/layers/GraphicsLayer',
                'esri/graphic',
                'esri/geometry/Point',
                'esri/symbols/PictureMarkerSymbol',
            ],
            {
                url: `${gisConfig.serverUrl}/init.js`,
            }
        )
        .then(
            ([
                Map,
                ArcGISTiledMapServiceLayer,
                GraphicsLayer,
                Graphic,
                Point,
                PictureMarkerSymbol,
            ]) => {
                map = new Map(domID, {
                    center: gisConfig.mapConfig.initCenter,
                    zoom: gisConfig.mapConfig.initZoom,
                    slider: false,
                })
                let tiledMapServiceLayer = new ArcGISTiledMapServiceLayer(
                    gisConfig.layerConfig.tileUrl
                )
                map.addLayer(tiledMapServiceLayer)
                esriFunction = {
                    map: map,
                    GraphicsLayer: GraphicsLayer,
                    Graphic: Graphic,
                    point: Point,
                    PictureMarkerSymbol: PictureMarkerSymbol,
                }
            }
        )
}
