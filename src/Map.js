import React from 'react'
import {ComposableMap, ZoomableGroup, Geographies, Geography} from 'react-simple-maps'

function generateGeographies (geographies, projection) {
    return geographies.map((geography, i) => geography.id !== 'ATA' && (
        <Geography
            key={i}
            geography={geography}
            projection={projection}
            style={{
                default: {
                    fill: '#ECEFF1',
                    stroke: '#607D8B',
                    strokeWidth: 0.75,
                    outline: 'none'
                },
                hover: {
                    fill: '#607D8B',
                    stroke: '#607D8B',
                    strokeWidth: 0.75,
                    outline: 'none'
                },
                pressed: {
                    fill: '#FF5722',
                    stroke: '#607D8B',
                    strokeWidth: 0.75,
                    outline: 'none'
                }
            }} />
    ))
}

export default function Map () {
    const props = {
        style: {
            width: '100%',
            maxWidth: 980,
            margin: '0 auto'
        }
    }

    return (
        <div {...props}>
            <ComposableMap
                projectionConfig={{scale: 205, rotation: [-11, 0, 0]}}
                width={980}
                height={551}
                style={{width: '100%', height: 'auto'}}>
                <ZoomableGroup center={[0, 20]} disablePanning>
                    <Geographies geography='world-110m.json'>
                        {generateGeographies}
                    </Geographies>
                </ZoomableGroup>
            </ComposableMap>
        </div>
    )
}
