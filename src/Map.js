import React from 'react'
import {ComposableMap, ZoomableGroup, Geographies} from 'react-simple-maps'

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
                    </Geographies>
                </ZoomableGroup>
            </ComposableMap>
        </div>
    )
}
